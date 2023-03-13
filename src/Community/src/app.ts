import express from 'express';
import cors from 'cors';
import { boardsRouter } from './routers/boardsRouter';
//import { commentsRouter } from './routers/commentsRouter';
//import { errorLogger, errorHandler } from './middlewares';
const app = express();

// CORS 에러 방지
app.use(cors());

// Content-Type : application/json 형태의 데이터 인식, 핸들링
app.use(express.json());
// Content-Type: application/x-www-form-urlencoded 형태 데이터 인식, 핸들링
app.use(express.urlencoded({ extended: false }));

// 라우팅
app.use('/api', boardsRouter);
//app.use('/api', commentsRouter);

// 미들웨어
//app.use(errorLogger);
//app.use(errorHandler);

export { app };
