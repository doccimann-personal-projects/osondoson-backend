import { RegisterBoardRequest } from '../application/dto/request/board.registerBoard.request';
import { BoardController } from '../presentation/board.controller';
import container from '../../../app/container/container';
import { checkCreatable } from '../presentation/board.middleware';
import { Router } from 'express';
import { responseMiddleware } from '../../../misc/utils/response.util';
import { validateBody } from '../../../misc/utils/validate.util';
import { Types } from '../../../app/container/types.di';

const boardRouter: Router = Router();
const boardController: BoardController = container.get<BoardController>(
  Types.BOARD_CONTROLLER,
);

boardRouter.post(
  '/',
  validateBody(RegisterBoardRequest),
  checkCreatable(),
  boardController.createdBoard,
  responseMiddleware,
);

export default boardRouter;
