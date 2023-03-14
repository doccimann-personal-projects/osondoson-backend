import container from '../../../app/container/container';
import { BoardService } from '../application/board.service';
import { commonErrors } from '../../../misc/error/error.common';
import { AppError } from '../../../misc/error/error.app';
import { RegisterBoardRequest } from '../application/dto/request/board.registerBoard.request';
import express from 'express';
import { Types } from '../../../app/container/types.di';

const boardService: BoardService = container.get(Types.BOARD_SERVICE);

export const checkCreatable =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const registerBoardRequest: RegisterBoardRequest =
      req.body as RegisterBoardRequest;

    // title 글자수 제한(50)
    const isMaxTitle: boolean = await boardService.isMaxTitle(
      registerBoardRequest.title,
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
      registerBoardRequest.content,
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

    // 참여신청 인원 제한(8)
    const isMaxTotalCount: boolean = await boardService.isMaxTotalCount(
      registerBoardRequest.totalCount,
    );

    if (isMaxTotalCount) {
      return next(
        new AppError(
          commonErrors.INPUT_ERROR,
          400,
          `최대 참여 인원은 8명입니다.`,
        ),
      );
    }

    next();
  };
