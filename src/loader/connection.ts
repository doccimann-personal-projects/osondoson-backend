import 'dotenv/config';
import { createConnection, DataSource, DataSourceOptions } from 'typeorm';
import { logger } from '../misc/logger';
import { User } from '../user/domain/user.entity';
import mongoose from 'mongoose';

export async function connectPostgresql(): Promise<void> {
  try {
    const connectionOptions: DataSourceOptions = {
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User],
      synchronize: true,
      logging: true,
      logger: 'advanced-console',
    };

    await createConnection(connectionOptions);

    logger.info('PostgreSQL 데이터베이스에 연결 완료하였습니다.');
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

export async function connectMongoDB(): Promise<void> {
  try {
    const MongoDB_URL = process.env.MongoDB_URL;

    mongoose.set('strictQuery', true);

    mongoose.connect(MongoDB_URL || 'env 파일 확인');
    const db = mongoose.connection;

    db.on('connected', () => logger.info('mongoDB에 연결을 완료하였습니다.'));
  } catch (e) {
    logger.error(e);
    throw e;
  }
}

(async () => {
  await connectPostgresql();
})();
