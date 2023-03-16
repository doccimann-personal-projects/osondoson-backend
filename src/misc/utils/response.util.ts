import { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';
import { AppResponse } from '../response.app';

// Success Response를 생성하는 함수
export function buildSuccessResponse<T>(data: T): AppResponse<T> {
  return { data, errorMessage: null };
}

// Fail Response를 생성하는 함수
export function buildFailResponse(errorMessage: string): AppResponse<null> {
  return { data: null, errorMessage };
}

// 응답을 처리하는 미들웨어
export function responseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const responseData = res.locals.data;

  const responseBody = buildSuccessResponse(responseData);

  const logMessage = getSuccessLogMessage(req, res, responseBody);

  logger.info(logMessage);

  // responseData가 null 혹은 undefined 일 경우 204 코드로 반환
  responseData ? res.json(responseBody) : res.status(204).json(responseBody);
}

// 로깅 메시지를 반환하는 함수
function getSuccessLogMessage(
  req: Request,
  res: Response,
  responseBody: any,
): string {
  const statusCode = responseBody === null ? 200 : 204;
  return `[${req.method}] ${req.originalUrl} ${statusCode} ${
    req.ip
  } ${JSON.stringify(responseBody)}`;
}
