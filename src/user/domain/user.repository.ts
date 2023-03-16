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

  async findById(userId: number): Promise<User | null> {
    const connection = await getConnection();
    return await connection.getRepository(User).findOneBy({
      id: userId,
    });
  }

  async deleteById(userId: number): Promise<User | null> {
     const targetUser = await this.findById(userId);

     if (!targetUser) return null;

     // soft-delete 정책 적용
     targetUser.deletedAt = new Date();
     targetUser.isDeleted = true;

     return await targetUser.save();
  }
}
