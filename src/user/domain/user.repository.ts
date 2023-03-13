import { getConnection } from 'typeorm';
import { injectable } from 'inversify';
import { User } from './user.entity';

@injectable()
export class UserRepository {
  async save(user: User): Promise<User> {
    return await user.save();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const connection = await getConnection();
    return await connection.getRepository(User).findOneBy({
      email: email,
    });
  }

  async findOneByNickname(nickname: string): Promise<User | null> {
    const connection = await getConnection();
    return await connection.getRepository(User).findOneBy({
      nickname: nickname,
    });
  }
}
