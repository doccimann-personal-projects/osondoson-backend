import { UserController } from './../presentation/user.controller';
import { checkCreatable } from './../presentation/user.middleware';
import { Router } from 'express';

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.post('/register', checkCreatable(), userController.signup);

export default userRouter;
