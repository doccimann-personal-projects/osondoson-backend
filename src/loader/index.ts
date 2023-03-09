import 'dotenv/config';
import { createConnection, DataSource, DataSourceOptions } from 'typeorm';
import { logger } from '../misc/logger';
import { User } from '../user/domain/user.entity';

export async function connectPostgresql(): Promise<DataSource | undefined> {
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

    const datasource = await createConnection(connectionOptions);

    logger.info('PostgreSQL 데이터베이스에 연결 완료하였습니다.');

    return datasource;
  } catch (e) {
    logger.error(e);
  }
}
