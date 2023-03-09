import { PickType } from '@nestjs/mapped-types';
import { User } from '../../../domain/user.entity';
import { Role } from '../../../domain/vo/role.vo';

export class RegisterRequest extends PickType(User, [
  'email',
  'password',
  'nickname',
  'gender',
  'birthDate',
]) {
  role: Role = Role.USER;

  // register dto를 user entity로 변환하는 메소드
  toUserEntity() {
    const { email, password, nickname, gender, birthDate, role } = this;

    return new User(email, password, nickname, gender, birthDate, role);
  }
}
