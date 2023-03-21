import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { Letter } from './letter.entity';

@injectable()
export class LetterRepository {
  async create(letter: Letter): Promise<Letter> {
    return await letter.save();
  }

  //해당 메세지 찾기
  async findByMsg ( id : number) : Promise <Letter | null> {
    const connection = await getConnection();

    return await connection.getRepository(Letter).findOneBy({ id : id });

  }

  //받는이 ID 조회
  async findByReceiverId(id: number): Promise<Letter | null> {
    const connection = await getConnection();
    return await connection.getRepository(Letter).findOneBy({ receiverId: id });
  }

  //보낸이 ID 조회
  async findByAuthorId ( id : number) : Promise < Letter | null > {
    const connection = await getConnection();
    return await connection.getRepository(Letter).findOneBy({ authorId : id });
  }

  // 보낸 ID 조회 후 삭제
  async deleteAuById(id: number): Promise<Letter | null> {
    const targetLetter = await this.findByMsg(id);

    if (!targetLetter) return null;

    targetLetter.deletedAt = new Date();
    targetLetter.isDeletedByAuthor = true;

    return await targetLetter.save();
  }

  async deleteReById (id : number) : Promise < Letter | null> {
    const targetLetter = await this.findByMsg(id);

    if(!targetLetter) return null;

    targetLetter.deletedAt = new Date();
    targetLetter.isDeletedByReceiver = true;

    return await targetLetter.save();
  }
}
