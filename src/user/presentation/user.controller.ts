import { UserService } from './../application/user.service';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import express from 'express';
import { UserRepository } from '../domain/user.repository';

export class UserController {
  async signup(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService: UserService = new UserService(new UserRepository());
    const registerRequest = RegisterRequest.of(req);

    const signUpResponse = await userService.signUp(registerRequest);

    res.locals.data = signUpResponse;
    next();
  }
}
