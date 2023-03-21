import { injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';
import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { Letter } from './letter.entity';

@injectable()
export class LetterRepository {
  async create(letter: Letter): Promise<Letter> {
    return await letter.save();
  }

  //해당 메세지 찾기
  async findByMsg(id: number): Promise<Letter | null> {
    const connection = await getConnection();

    return await connection.getRepository(Letter).findOneBy({ id: id });
  }

  // 수신 메시지를 페이지네이션 기반으로 받아오는 메소드
  async findReceivedLetters(
    receiverId: number,
    page: number,
    limit: number,
  ): Promise<[Letter[], number]> {
    const letterRepository = await this.getLetterRepository();

    return await letterRepository
      .createQueryBuilder('letter')
      .where('letter.receiverId = :receiverId', { receiverId: receiverId })
      .andWhere('letter.isDeletedByReceiver = :isDeletedByReceiver', {
        isDeletedByReceiver: false,
      })
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('letter.createdAt', 'DESC')
      .getManyAndCount();
  }

  //보낸이 ID 조회
  async findByAuthorId(id: number): Promise<Letter | null> {
    const connection = await getConnection();
    return await connection.getRepository(Letter).findOneBy({ authorId: id });
  }

  // 보낸 ID 조회 후 삭제
  async deleteAuById(id: number): Promise<Letter | null> {
    const targetLetter = await this.findByMsg(id);

    if (!targetLetter) return null;

    targetLetter.deletedAt = new Date();
    targetLetter.isDeletedByAuthor = true;

    return await targetLetter.save();
  }

  async deleteReById(id: number): Promise<Letter | null> {
    const targetLetter = await this.findByMsg(id);

    if (!targetLetter) return null;

    targetLetter.deletedAt = new Date();
    targetLetter.isDeletedByReceiver = true;

    return await targetLetter.save();
  }

  // connection을 통해서 repository를 가져오는 메소드
  async getLetterRepository(): Promise<Repository<Letter>> {
    const connection = await getConnection();

    return connection.getRepository(Letter);
  }
}
