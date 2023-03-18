import { Router } from 'express';
import { responseMiddleware } from '../../misc/utils/response.util';
import { validateBody } from '../../misc/utils/validate.util';
import container from '../../app/container/container';
import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { LetterController } from '../presentation/letter.controller';
import { Types } from '../../app/container/types.di';
import { verifyAccessToken } from '../../user/presentation/user.middleware';

const letterRouter: Router = Router();
const letterController: LetterController = container.get<LetterController>(
  Types.LETTER_CONTROLLER,
);

letterRouter.post(
  '/',
  verifyAccessToken,
  validateBody(LetterCreateRequest),
  letterController.makeLetter,
  responseMiddleware,
);

letterRouter.delete(
  '/:id/inbox',
  verifyAccessToken,
  letterController.deleteLetter,
  responseMiddleware,
);

letterRouter.get(
  '/:receiverId/inbox',
  verifyAccessToken,
  letterController.getLetter,
  responseMiddleware,
);

export default letterRouter;
