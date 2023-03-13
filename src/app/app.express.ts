import express, { Express } from 'express';
import cors from 'cors';
import { AppError } from '../misc/error/error.app';
import { commonErrors } from '../misc/error/error.common';
import { logger } from '../misc/logger';
import { buildFailResponse } from '../misc/utils/response.util';
import userRouter from '../user/router';
import '../loader/connection';

export class ExpressApp {
  // express app을 반환
  static async of(): Promise<Express> {
    const expressApp: Express = express();

    // CORS 설정
    expressApp.use(cors());

    // JSON을 받아올 수 있도록 설정
    expressApp.use(express.json());

    // Health Check Router
    expressApp.get('/health', (req: express.Request, res: express.Response) => {
      logger.info('Healthy');
      res.json({
        data: 'OK',
      });
    });

    /* 사용자 정의 Router를 위치시키는 자리 */
    expressApp.use('/api/users', userRouter);

    // 허용되지 않은 요청을 처리하는 라우터
    expressApp.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        next(
          new AppError(
            commonErrors.RESOURCE_NOT_FOUND_ERROR,
            404,
            `허용되지 않은 접근입니다.`,
          ),
        );
      },
    );

    // 에러 처리
    expressApp.use(
      (
        error: Error | AppError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        logger.error(error);
        res.statusCode = error instanceof AppError ? error.httpCode : 500;
        res.json(buildFailResponse(error.message));
      },
    );

    return expressApp;
  }
}
