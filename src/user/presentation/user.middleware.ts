import container from '../../app/container/container';
import { UserService } from './../application/user.service';
import { commonErrors } from './../../misc/error/error.common';
import { AppError } from './../../misc/error/error.app';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import { Types } from '../../app/container/types.di';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const userService: UserService = container.get(Types.USER_SERVICE);

export const checkCreatable =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const registerRequest: RegisterRequest = req.body as RegisterRequest;

    // 이미 존재하는 이메일인지 검증한다
    const isAlreadyExistEmail: boolean = await userService.isAlreadyExistEmail(
      registerRequest.email,
    );

    if (isAlreadyExistEmail) {
      return next(
        new AppError(commonErrors.INPUT_ERROR, 400, `중복된 이메일입니다`),
      );
    }

    // 이미 존재하는 닉네임인지 검증한다
    const isAlreadyExistNickname: boolean =
      await userService.isAlreadyExistNickname(registerRequest.nickname);

    if (isAlreadyExistNickname) {
      return next(
        new AppError(commonErrors.INPUT_ERROR, 400, `중복된 닉네임입니다`),
      );
    }

    next();
  };

// 리프레시 토큰을 검증해서 res.locals.tokenPayload에 넣어주는 미들웨어
export const verifyRefreshToken = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    res.locals.tokenPayload = jwt.verify(
      req.headers.authorization!,
      refreshTokenSecret!,
    );
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new AppError(
          commonErrors.AUTHENTICATION_ERROR,
          401,
          '토큰이 만료되었습니다',
        ),
      );
    }

    return next(
      new AppError(
        commonErrors.AUTHENTICATION_ERROR,
        401,
        '유효하지 않은 토큰입니다',
      ),
    );
  }
};
