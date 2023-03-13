import { inject, injectable } from 'inversify';
import { UserService } from './../application/user.service';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import express from 'express';
import { Types } from '../../app/container/types.di';
import container from '../../app/container/container';

@injectable()
export class UserController {

  async signup(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const userService = container.get<UserService>(Types.USER_SERVICE);
    const registerRequest = RegisterRequest.of(req);

    const signUpResponse = await userService.signUp(registerRequest);

    res.locals.data = signUpResponse;
    next();
  }
}
