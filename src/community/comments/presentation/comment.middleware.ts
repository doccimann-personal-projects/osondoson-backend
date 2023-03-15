import container from '../../../app/container/container';
import { CommentService } from '../application/comment.service';
import { BoardService } from '../../boards/application/board.service';
import { commonErrors } from '../../../misc/error/error.common';
import { AppError } from '../../../misc/error/error.app';
import { RegisterCommentRequest } from '../application/dto/request/comment.register.request';
import { UpdateBoardRequest } from '../application/dto/request/comment.update.request';
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

    // content 글자수 제한(200)
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
/* 
export const checkPatchable =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const updateBoardRequest: UpdateBoardRequest =
      req.body as UpdateBoardRequest;

    // title, content 하나라도 존재하는지 확인
    const isExistedOne: boolean = await boardService.isExistedOne(
      updateBoardRequest.title,
      updateBoardRequest.content,
    );
    if (isExistedOne) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          400,
          `title, content 둘 중 하나는 존재해야합니다.`,
        ),
      );
    } else {
      // title 글자수 제한(50)
      const isMaxTitle: boolean = await boardService.isMaxTitle(
        updateBoardRequest.title,
      );
      if (isMaxTitle) {
        return next(
          new AppError(
            commonErrors.INPUT_ERROR,
            400,
            `제목은 50자까지만 허용합니다.`,
          ),
        );
      }
      // content 글자수 제한(500)
      const isMaxContent: boolean = await boardService.isMaxContent(
        updateBoardRequest.content,
      );
      if (isMaxContent) {
        return next(
          new AppError(
            commonErrors.INPUT_ERROR,
            400,
            `본문은 50자까지만 허용합니다.`,
          ),
        );
      }
    }
    next();
  };
 */
