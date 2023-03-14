import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Request } from 'express';

export class UserLoginRequest {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  static of(req: Request): UserLoginRequest {
    const { email, password } = req.body;

    const userLoginRequest = new UserLoginRequest();
    userLoginRequest.email = email;
    userLoginRequest.password = password;

    return userLoginRequest;
  }
}
