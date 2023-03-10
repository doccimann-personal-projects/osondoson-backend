import { BirthDate } from './../../../domain/vo/birthdate.vo';
import { PickType } from '@nestjs/mapped-types';
import { User } from '../../../domain/user.entity';
import { Role } from '../../../domain/vo/role.vo';
import { Gender } from '../../../domain/vo/gender.vo';

export class RegisterRequest extends PickType(User, [
  'email',
  'password',
  'nickname',
  'gender',
  'birthDate',
  'role'
] as const) {
  constructor(email: string, password: string, nickname: string, gender: Gender, birthDate: BirthDate, role: Role) {
    super();

    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.gender = gender;
    this.birthDate = birthDate;
    this.role = role;
  }
  // register dto를 user entity로 변환하는 메소드
  toUserEntity() {
    const { email, password, nickname, gender, birthDate, role } = this;

    return new User(email, password, nickname, gender, birthDate, role);
  }
}
