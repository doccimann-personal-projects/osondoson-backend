import { RegisterRequest } from './../application/dto/request/user.register.request';
import { UserController } from './../presentation/user.controller';
import { checkCreatable } from './../presentation/user.middleware';
import { Router } from 'express';
import { validateBody } from '../../misc/util';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post(
  '/register',
  validateBody(RegisterRequest),
  checkCreatable(),
  userController.signup,
);

export default userRouter;
