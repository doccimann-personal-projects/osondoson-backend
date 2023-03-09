import { User } from './user.entity';

export class UserDao {
  async save(user: User): Promise<User> {
    return user.save();
  }
}
