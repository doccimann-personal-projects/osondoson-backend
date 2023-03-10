import dotenv from 'dotenv';
import { AppError } from '../misc/error/error.app';
import { commonErrors } from '../misc/error/error.common';
import { logger } from '../misc/logger';

const envFound = dotenv.config();

// if .env file is not found, throw the error
if (envFound.error) {
  throw new AppError(
    commonErrors.CONFIG_ERROR,
    500,
    "Couldn't find .env file on root folder",
  );
}

process.env.APPLICATION_NAME = process.env.APPLICATION_NAME ?? 'app';
process.env.PORT = process.env.PORT ?? '3500';
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';

logger.info(
  `어플리케이션을 다음의 환경으로 시작합니다: ${process.env.NODE_ENV}`,
);

export default {
  applicationName: process.env.APPLICATION_NAME,
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
};
