import { inject, injectable } from 'inversify';
import { BoardService } from '../application/board.service';
import { RegisterBoardRequest } from '../application/dto/request/board.registerBoard.request';
import express from 'express';
import { Types } from '../../../app/container/types.di';
import container from '../../../app/container/container';

@injectable()
export class BoardController {
  async createdBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const registerBoardRequest = RegisterBoardRequest.of(req);

    const result = await boardService.createBoard(registerBoardRequest);

    res.locals.data = result;
    next();
  }
}
