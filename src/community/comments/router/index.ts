import { RegisterCommentRequest } from '../application/dto/request/comment.register.request';
//import { UpdateCommentRequest } from '../application/dto/request/comment.update.request';
import { CommentController } from '../presentation/comment.controller';
import container from '../../../app/container/container';
import {
  checkCreatable,
  checkBoardExist,
  //  checkPatchable,
} from '../presentation/comment.middleware';
import { Router } from 'express';
import { responseMiddleware } from '../../../misc/utils/response.util';
import { validateBody } from '../../../misc/utils/validate.util';
import { Types } from '../../../app/container/types.di';

const commentRouter: Router = Router();
const commentController: CommentController = container.get<CommentController>(
  Types.COMMENT_CONTROLLER,
);

// 댓글 생성
commentRouter.post(
  '/boards/:boardId/comments',
  checkBoardExist(),
  validateBody(RegisterCommentRequest),
  checkCreatable(),
  commentController.createdComment,
  responseMiddleware,
);
/* 
// 게시판 전체 조회
boardRouter.get('/', boardController.getAllBoards, responseMiddleware);

// 게시판 상세 조회
boardRouter.get(
  '/:id',
  checkIdExist(),
  boardController.getBoard,
  responseMiddleware,
);

// 게시글 수정
boardRouter.put(
  '/:id',
  checkIdExist(),
  validateBody(UpdateBoardRequest),
  checkPatchable(),
  boardController.updateBoard,
  responseMiddleware,
);

// 게시글 삭제
boardRouter.delete(
  '/:id',
  checkIdExist(),
  boardController.deleteBoard,
  responseMiddleware,
);

// 참여 신청
boardRouter.post(
  '/:id/participants',
  checkIdExist(),
  boardController.joinBoard,
  responseMiddleware,
);
 */
export default commentRouter;
