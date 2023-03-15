import { inject, injectable } from 'inversify';
import { BoardService } from '../application/board.service';
import { RegisterBoardRequest } from '../application/dto/request/board.register.request';
import { UpdateBoardRequest } from '../application/dto/request/board.update.request';
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
    const { sub } = res.locals.tokenPayload;
    const registerBoardRequest = RegisterBoardRequest.of(req);
    const result = await boardService.createBoard(sub, registerBoardRequest);

    res.locals.data = result;
    next();
  }

  async getAllBoards(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const page: number = Number(req.query.page || 1);
    const limit: number = Number(req.query.limit || 10);

    const result = await boardService.findAllBoards(page, limit);

    res.locals.data = result;
    next();
  }

  async getBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const id: string = req.params.id;
    const result = await boardService.getBoardData(id);

    res.locals.data = result;
    next();
  }

  async updateBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const id: string = req.params.id;
    const updateBoardRequest = UpdateBoardRequest.of(req);
    const result = await boardService.updateBoard(id, updateBoardRequest);

    res.locals.data = result;
    next();
  }

  async deleteBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const id: string = req.params.id;
    const result = await boardService.deleteBoard(id);

    res.locals.data = result;
    next();
  }

  async joinBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);
    const id: string = req.params.id;

    const result = await boardService.joinBoard(id);

    res.locals.data = result;
    next();
  }
}
