import { injectable } from 'inversify';
import { getConnection } from 'typeorm';
import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { Letter } from './letter.entity';

@injectable()
export class LetterRepository {
  async create(letter: Letter): Promise<Letter> {
    return await letter.save();
  }

  async findById(id: number): Promise<Letter | null> {
    const connection = await getConnection();
    return await connection.getRepository(Letter).findOneBy({ id: id });
  }

  async deleteById(id: number): Promise<Letter | null> {
    const targetLetter = await this.findById(id);

    if (!targetLetter) return null;

    targetLetter.deletedAt = new Date();
    targetLetter.isDeleted = true;

    return await targetLetter.save();
  }
}
