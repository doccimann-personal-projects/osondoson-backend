import { UserLoginRequest } from './../application/dto/request/user.login.request';
import { inject, injectable } from 'inversify';
import { UserService } from './../application/user.service';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import { Types } from '../../app/container/types.di';
import container from '../../app/container/container';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../misc/logger';

@injectable()
export class UserController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = container.get<UserService>(Types.USER_SERVICE);
      const registerRequest = RegisterRequest.of(req);

      const signUpResponse = await userService.signUp(registerRequest);

      res.locals.data = signUpResponse;
      next();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userService = container.get<UserService>(Types.USER_SERVICE);

      const loginRequest = UserLoginRequest.of(req);

      const loginResponse = await userService.login(loginRequest);

      res.locals.data = loginResponse;
      next();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
