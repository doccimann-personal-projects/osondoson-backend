import { RegisterRequest } from './../application/dto/request/user.register.request';
import { UserService } from './../application/user.service';
import express from 'express';
import { buildSuccessResponse } from '../../misc/util';
export class UserController {
  private readonly userService: UserService = new UserService();

  async signup(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const registerRequest: RegisterRequest = req.body();

    const signUpResponse: string = await this.userService.signUp(
      registerRequest,
    );

    return res.json(buildSuccessResponse(signUpResponse));
  }
}
