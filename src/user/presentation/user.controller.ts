import { Role } from './../domain/vo/role.vo';
import { UserService } from './../application/user.service';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import express from 'express';
import { buildSuccessResponse } from '../../misc/util';
import { UserRepository } from '../domain/user.repository';

export class UserController {
  async signup(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService: UserService = new UserService(new UserRepository());
    const { email, password, nickname, gender, birthDate } = req.body;
    const registerRequest = new RegisterRequest(
      email,
      password,
      nickname,
      gender,
      birthDate,
      Role.USER,
    );

    const signUpResponse: string = await userService.signUp(registerRequest);

    res.json(buildSuccessResponse(signUpResponse));
  }
}
