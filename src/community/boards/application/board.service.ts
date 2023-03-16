import { BoardRepository } from './../domain/board.repository';
import { inject, injectable } from 'inversify';
import { Boards } from '../domain/board.entity';
import { RegisterBoardRequest } from './dto/request/board.register.request';
import { UpdateBoardRequest } from './dto/request/board.update.request';
import { Types } from '../../../app/container/types.di';

@injectable()
export class BoardService {
  constructor(
    @inject(Types.BOARD_REPOSITORY)
    private readonly boardRepository: BoardRepository,
  ) {}

  // 게시글 생성
  async createBoard(
    nickname: string,
    registerBoardRequest: RegisterBoardRequest,
  ): Promise<object> {
    const createdNewBoard = await this.boardRepository.create(nickname, {
      title: registerBoardRequest.title,
      content: registerBoardRequest.content,
      totalCount: registerBoardRequest.totalCount,
    });
    return createdNewBoard;
  }

  // title 글자 수 50자 초과 여부
  async isMaxTitle(title: string | null): Promise<boolean> {
    if (title && title.length > 50) {
      return true;
    } else {
      return false;
    }
  }

  // content 글자 수 500자 초과 여부
  async isMaxContent(content: string | null): Promise<boolean> {
    if (content && content.length > 50) {
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

  // 게시판 전체 조회
  async findAllBoards(page: number, limit: number): Promise<object> {
    const boards = await this.boardRepository.findAllBoards(page, limit);

    return boards;
  }

  // 게시판 상세 조회
  async getBoardData(nickname: string, id: string): Promise<object | null> {
    const board = await this.boardRepository.findBoardById(nickname, id);

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
    nickname: string,
    id: string,
    updateBoardRequest: UpdateBoardRequest,
  ): Promise<object | null> {
    const updatedBoard = await this.boardRepository.updateById(
      nickname,
      id,
      updateBoardRequest,
    );
    return updatedBoard;
  }

  async deleteBoard(nickname: string, id: string): Promise<string | null> {
    const deletedBoard = await this.boardRepository.deletedById(nickname, id);

    return deletedBoard;
  }

  async joinBoard(nickname: string, id: string): Promise<object | null> {
    const joinedBoard = await this.boardRepository.joinedBoard(nickname, id);

    return joinedBoard;
  }

  async checkCount(id: string): Promise<boolean> {
    const board = await this.boardRepository.findBoardForjoin(id);
    const totalCount = board?.participantInfo.totalCount;
    const currentCount = board?.participantInfo.currentCount;
    // 모집 인원과 참여 인원 비교
    if (totalCount && currentCount) {
      if (totalCount <= currentCount) {
        // 6 7
        return true;
      }
    }
    return false;
  }

  async checkJoinnedList(id: string, nickname: string): Promise<boolean> {
    const board = await this.boardRepository.findBoardForjoin(id);
    const userIdList = board?.participantInfo.userIdList;
    const joinnerName = nickname;
    if (userIdList?.includes(joinnerName)) {
      return true;
    }
    return false;
  }
}
