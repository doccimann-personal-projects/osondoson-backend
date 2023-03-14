import { inject, injectable } from 'inversify';
import { BoardRepository } from '../domain/board.repository';
//import { Boards } from '../domain/board.entity';
import { RegisterBoardRequest } from './dto/request/board.registerBoard.request';
import { Types } from '../../../app/container/types.di';

@injectable()
export class BoardService {
  constructor(
    @inject(Types.BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepository,
  ) {}

  // 게시글 생성
  async createBoard(
    registerBoardRequest: RegisterBoardRequest,
  ): Promise<object> {
    const createdNewBoard = await this.boardRepository.create({
      title: registerBoardRequest.title,
      content: registerBoardRequest.content,
      totalCount: registerBoardRequest.totalCount,
    });
    return createdNewBoard;
  }

  // title 글자 수 50자 초과 여부
  async isMaxTitle(title: string): Promise<boolean> {
    if (title.length > 50) {
      return true;
    } else {
      return false;
    }
  }

  // content 글자 수 500자 초과 여부
  async isMaxContent(content: string): Promise<boolean> {
    if (content.length > 50) {
      return true;
    } else {
      return false;
    }
  }

  // totalCount(참여인원) 8명 초과 여부
  async isMaxTotalCount(totalCount: number): Promise<boolean> {
    if (totalCount > 8) {
      return true;
    } else {
      return false;
    }
  }
}
