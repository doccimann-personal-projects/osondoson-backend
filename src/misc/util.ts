import { validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { commonErrors } from './error/error.common';
import { AppError } from './error/error.app';
import { NextFunction, Request, Response } from 'express';
import { AppResponse } from './response.app';

// 어떤 것에대한 유틸인지를 명확하게 해줬으면! => 파일명
// Success Response를 생성하는 함수
export function buildSuccessResponse<T>(data: T): AppResponse<T> {
  return { data, errorMessage: null };
}

// Fail Response를 생성하는 함수
export function buildFailResponse(errorMessage: string): AppResponse<null> {
  return { data: null, errorMessage };
}

// 응답을 처리하는 미들웨어
export function responseMiddleware(req: Request, res: Response, next: NextFunction) {
  const responseData = res.locals.data;

  const responseBody = buildSuccessResponse(responseData);

  res.json(responseBody);
}

// class-validator에 의해 dto를 검증하는 함수
export function validateBody(schema: { new (): any }) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const target = plainToClass(schema, req.body);
    try {
      await validateOrReject(target);
      next();
    } catch (e) {
      next(new AppError(commonErrors.REQUEST_VALIDATION_ERROR, 400, '올바르지 않은 입력입니다'));
    }
  };
}