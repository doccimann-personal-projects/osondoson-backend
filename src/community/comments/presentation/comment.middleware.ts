import container from '../../../app/container/container';
import { CommentService } from '../application/comment.service';
import { BoardService } from '../../boards/application/board.service';
import { commonErrors } from '../../../misc/error/error.common';
import { AppError } from '../../../misc/error/error.app';
import { RegisterCommentRequest } from '../application/dto/request/comment.register.request';
import { UpdateCommentRequest } from '../application/dto/request/comment.update.request';
import express from 'express';
import { Types } from '../../../app/container/types.di';

const commentService: CommentService = container.get(Types.COMMENT_SERVICE);
const boardService: BoardService = container.get(Types.BOARD_SERVICE);

export const checkCreatable =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const registerCommentRequest: RegisterCommentRequest =
      req.body as RegisterCommentRequest;

    // 댓글 글자수 제한(200)
    const isMaxContent: boolean = await commentService.isMaxContent(
      registerCommentRequest.content,
    );
    if (isMaxContent) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          400,
          `댓글은 200자까지만 허용합니다.`,
        ),
      );
    }
    next();
  };

export const checkBoardExist =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const boardId: string = req.params.boardId;

    const isExistBoard: boolean = await boardService.isExistId(boardId);
    if (isExistBoard) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          204,
          `해당 id의 게시글은 존재하지 않습니다.`,
        ),
      );
    }
    next();
  };
export const checkCommentExist =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const id: string = req.params.id;

    // 해당 id의 게시글 존재 여부
    // 🚩
    const isExistId: boolean = await commentService.isExistId(id);
    if (isExistId) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          204,
          `해당 id의 댓글은 존재하지 않습니다.`,
        ),
      );
    }
    next();
  };

export const checkPatchable =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const updateCommentRequest: UpdateCommentRequest =
      req.body as UpdateCommentRequest;

    // 댓글 글자 수 제한(200)
    const isMaxContent: boolean = await commentService.isMaxContent(
      updateCommentRequest.content,
    );
    if (isMaxContent) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          400,
          `댓글은 200자까지만 허용합니다.`,
        ),
      );
    }
    next();
  };
