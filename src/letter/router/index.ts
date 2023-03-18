import { Router } from 'express';
import { responseMiddleware } from '../../misc/utils/response.util';
import { validateBody } from '../../misc/utils/validate.util';
import container from '../../app/container/container';
import { CreateRequest } from '../application/DTO/Request/letter.create.request';
import { LetterController } from '../presentation/letter.controller';
import { Types } from '../../app/container/types.di';
import { checkCreatable,  verifyAccessToken } from '../presentation/letter.middleware';

const letterRouter : Router = Router();
const letterController : LetterController = container.get<LetterController>(Types.LETTER_CONTROLLER,);

letterRouter.post(
    '/',
    validateBody(CreateRequest),
    checkCreatable(),
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