import { UserLoginRequest } from './../application/dto/request/user.login.request';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import { UserController } from './../presentation/user.controller';
import container from '../../app/container/container';
import {
  checkCreatable,
  verifyAccessToken,
  verifyRefreshToken,
} from './../presentation/user.middleware';
import { Router } from 'express';
import { responseMiddleware } from '../../misc/utils/response.util';
import { validateBody } from '../../misc/utils/validate.util';
import { Types } from '../../app/container/types.di';

const userRouter: Router = Router();
const userController: UserController = container.get<UserController>(
  Types.USER_CONTROLLER,
);

userRouter.post(
  '/register',
  validateBody(RegisterRequest),
  checkCreatable(),
  userController.signup,
  responseMiddleware,
);

userRouter.post(
  '/login',
  validateBody(UserLoginRequest),
  userController.login,
  responseMiddleware,
);

userRouter.post(
  '/logout',
  verifyAccessToken,
  userController.logout,
  responseMiddleware,
);

// 리프레시 토큰을 이용해서 액세스 토큰을 새로 발급받는 endpoint 정의
userRouter.post(
  '/refresh',
  verifyRefreshToken,
  userController.refresh,
  responseMiddleware,
);

// 유저의 프로필을 조회하는 endpoint 정의
userRouter.post(
  '/user',
  verifyAccessToken,
  userController.getProfile,
  responseMiddleware,
);

export default userRouter;
