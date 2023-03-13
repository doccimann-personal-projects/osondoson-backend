import { RegisterRequest } from './../application/dto/request/user.register.request';
import { UserController } from './../presentation/user.controller';
import container from '../../app/container/container';
import { checkCreatable } from './../presentation/user.middleware';
import { Router } from 'express';
import { responseMiddleware, validateBody } from '../../misc/util';
import { Types } from '../../app/container/types.di';

const userRouter: Router = Router();
const userController: UserController = container.get<UserController>(Types.USER_CONTROLLER);

userRouter.post(
  '/register',
  validateBody(RegisterRequest),
  checkCreatable(),
  userController.signup,
  responseMiddleware
);

export default userRouter;
