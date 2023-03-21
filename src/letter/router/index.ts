import { checkLetterCreatable } from './../presentation/letter.middleware';
import { Router } from 'express';
import {
  paginatedResponseMiddleware,
  responseMiddleware,
} from '../../misc/utils/response.util';
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

// 쪽지 생성
letterRouter.post(
  '/',
  verifyAccessToken,
  validateBody(LetterCreateRequest),
  checkLetterCreatable,
  letterController.createLetter,
  responseMiddleware,
);

//받은 메세지를 페이지네이션 기반으로 조회
letterRouter.get(
  '/inbox',
  verifyAccessToken,
  letterController.getReceivedLetterList,
  paginatedResponseMiddleware,
);

// 보낸 편지 목록을 페이지네이션 기반으로 조회
letterRouter.get(
  '/outbox',
  verifyAccessToken,
  letterController.getSentLetterList,
  paginatedResponseMiddleware,
);

export default letterRouter;
