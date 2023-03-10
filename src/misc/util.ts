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
