import { logger } from '../../../misc/logger';
import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack);

  res.status(400).json({ reason: err.message });
};
module.exports = { errorHandler };
