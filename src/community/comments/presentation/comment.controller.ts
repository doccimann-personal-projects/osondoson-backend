import { BoardService } from './../../boards/application/board.service';
import { inject, injectable } from 'inversify';
import { CommentService } from '../application/comment.service';
import { RegisterCommentRequest } from '../application/dto/request/comment.register.request';
import { UpdateCommentRequest } from '../application/dto/request/comment.update.request';
import express from 'express';
import { Types } from '../../../app/container/types.di';
import container from '../../../app/container/container';

@injectable()
export class CommentController {
  async createdComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const commentService = container.get<CommentService>(Types.COMMENT_SERVICE);
    const boardService = container.get<BoardService>(Types.BOARD_SERVICE);

    const Id: string = req.params.boardId;
    const getBoardId: any = await boardService.getBoardData(Id);
    const boardId: string = getBoardId._id;
    const registerCommentRequest = RegisterCommentRequest.of(req);
    const result = await commentService.createComment(
      boardId,
      registerCommentRequest,
    );

    res.locals.data = result;
    next();
  }

  async getAllComments(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const commentService = container.get<CommentService>(Types.COMMENT_SERVICE);
    const page: number = Number(req.query.page || 1);
    const limit: number = Number(req.query.limit || 10);
    const Id: string = req.params.boardId;
    const result = await commentService.findAllComments(Id, page, limit);

    res.locals.data = result;
    next();
  }

  async updateComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const commentService = container.get<CommentService>(Types.COMMENT_SERVICE);
    const id: string = req.params.id;
    const updateCommentRequest = UpdateCommentRequest.of(req);
    const result = await commentService.updateComment(id, updateCommentRequest);

    res.locals.data = result;
    next();
  }

  async deleteBoard(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const commentService = container.get<CommentService>(Types.COMMENT_SERVICE);
    const id: string = req.params.id;
    const result = await commentService.deleteComment(id);

    res.locals.data = result;
    next();
  }
}
