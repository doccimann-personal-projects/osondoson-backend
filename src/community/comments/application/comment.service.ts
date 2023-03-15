import { CommentRepository } from '../domain/comment.repository';
import { inject, injectable } from 'inversify';
import { Comments } from '../domain/comment.entity';
import { RegisterCommentRequest } from './dto/request/comment.register.request';
//import { UpdateCommentRequest } from './dto/request/comment.update.request';
import { Types } from '../../../app/container/types.di';

@injectable()
export class CommentService {
  constructor(
    @inject(Types.COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
  ) {}

  // 댓글 생성
  async createComment(
    boardId: string,
    registerCommentRequest: RegisterCommentRequest,
  ): Promise<string | undefined> {
    const createdNewComment = await this.commentRepository.create({
      boardId: boardId,
      content: registerCommentRequest.content,
    });
    return createdNewComment;
  }

  // 댓글 글자 수 200자 초과 여부
  async isMaxContent(content: string): Promise<boolean> {
    if (content.length > 200) {
      return true;
    } else {
      return false;
    }
  }

  /* 
  // 게시판 전체 조회
  async findAllBoards(page: number, limit: number): Promise<object> {
    const boards = await this.boardRepository.findAllBoards(page, limit);

    return boards;
  }

  // 게시판 상세 조회
  async getBoardData(id: string): Promise<object> {
    const board = await this.boardRepository.findBoardById(id);

    return board;
  }

  // 해당 id의 게시글 존재 여부
  async isExistId(id: string): Promise<boolean> {
    const board = await this.boardRepository.findBoard(id);
    if (!board) {
      return true;
    } else {
      return false;
    }
  }

  // title, content 하나라도 존재하는지 확인
  async isExistedOne(title?: string, content?: string): Promise<boolean> {
    if (!title && !content) {
      return true;
    } else {
      return false;
    }
  }

  async updateBoard(
    id: string,
    updateBoardRequest: UpdateBoardRequest,
  ): Promise<object | undefined> {
    const updatedBoard = await this.boardRepository.updateById(
      id,
      updateBoardRequest,
    );
    return updatedBoard;
  }

  async deleteBoard(id: string): Promise<string | undefined> {
    const deletedBoard = await this.boardRepository.deletedById(id);

    return deletedBoard;
  }

  async joinBoard(id: string): Promise<object | undefined> {
    const joinedBoard = await this.boardRepository.joinedBoard(id);

    return joinedBoard;
  } */
}
