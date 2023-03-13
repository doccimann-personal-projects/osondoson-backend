import { BoardsModel } from './../db/models/boardsModel';
import express from 'express';
import { boardsService } from '../services/boardsService';

const boardsRouter = express.Router();

// 게시글 등록
boardsRouter.post(
  '/boards',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // req에서 데이터 가져오기
      const { title, content, totalCount } = req.body;
      const newBoard = await boardsService.registerBoard({
        title,
        content,
        totalCount,
      });

      res.status(201).json(newBoard);
      /* 
	title: string,
	content: string,
	totalCount: number,
*/
    } catch (err) {
      next(err);
    }
  },
);

//게시글 전체 조회
boardsRouter.get(
  '/boards',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const page: number = Number(req.query.page || 1);
      const limit: number = Number(req.query.limit || 10);
      const total = await boardsService.getCountPages();
      const boards = await boardsService.getAllBoards(page, limit);

      res.status(200).json({ boards });
    } catch (err) {
      next(err);
    }
  },
);
// 게시글 상세 조회
boardsRouter.get(
  '/boards/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // 게시글 id
      const { id } = req.params;
      const boardData = await boardsService.getBoardData(id);

      res.status(200).json(boardData);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 수정
boardsRouter.put(
  '/boards/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // 게시글 id
      const { id } = req.params;
      const { title, content } = req.body;

      const toUpdate: object = {
        ...(title && { title }),
        ...(content && { content }),
      };

      const updatedBoard = await boardsService.updateBoard(id, toUpdate);

      res.status(200).json(updatedBoard);
    } catch (err) {
      next(err);
    }
  },
);

// 게시글 삭제
boardsRouter.delete(
  '/boards/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const deleteResult = await boardsService.deletedBoard(id);
      res.status(200).json('OK');
    } catch (err) {
      next(err);
    }
  },
);
export { boardsRouter };
