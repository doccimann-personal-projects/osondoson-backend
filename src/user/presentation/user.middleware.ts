import { UserService } from './../application/user.service';
import { commonErrors } from './../../misc/error/error.common';
import { AppError } from './../../misc/error/error.app';
import { RegisterRequest } from './../application/dto/request/user.register.request';
import express from 'express';
import { UserRepository } from '../domain/user.repository';

const userService: UserService = new UserService(new UserRepository());

export const checkCreatable =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
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
