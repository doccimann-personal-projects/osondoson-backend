import 'dotenv/config';
import { app } from './src/app';
import mongoose from 'mongoose';
import { logger } from '../misc/logger';
import { commonErrors } from '../misc/error/error.common';

// connect port
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`서버를 정상적으로 시작했습니다. http://localhost:${PORT}`);
});

// mongo DB 연결

const MongoDB_URL =
  'mongodb+srv://osondoson:55!osonDoson@osondoson.pjzysfl.mongodb.net/?retryWrites=true&w=majority';

// strictQuery 오류 처리를 위한 세팅
mongoose.set('strictQuery', true);

mongoose.connect(MongoDB_URL);
const db = mongoose.connection;

db.on('connected', () => console.log('welcome mongoDB' + MongoDB_URL));
db.on('error', (error: any) =>
  logger.error(commonErrors.DATABASE_ERROR + `DB 연결 오류`),
);
