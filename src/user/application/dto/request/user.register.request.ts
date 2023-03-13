import { Request } from 'express';
import { BirthDate } from './../../../domain/vo/birthdate.vo';
import { User } from '../../../domain/user.entity';
import { Role } from '../../../domain/vo/role.vo';
import { Gender } from '../../../domain/vo/gender.vo';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsEmail()
  email: string = '';

  @IsString()
  password: string = '';

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  nickname: string = '';

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender = Gender.MALE;

  @IsNotEmpty()
  birthDate: BirthDate = new BirthDate(0, 0, 0);

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role = Role.USER;

  static of(req: Request, role?: Role): RegisterRequest {
    const { email, password, nickname, gender, birthDate } = req.body;

    const registerRequest = new RegisterRequest()
    registerRequest.email = email;
    registerRequest.password = password;
    registerRequest.nickname = nickname;
    registerRequest.gender = gender;
    registerRequest.birthDate = birthDate;
    registerRequest.role = role ??= Role.USER;
    
    return registerRequest;
  }

  // register dto를 user entity로 변환하는 메소드
  toUserEntity() {
    const { email, password, nickname, gender, birthDate, role } = this;

    return new User(email, password, nickname, gender, birthDate, role);
  }
}
