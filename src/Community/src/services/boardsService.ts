import { boardsModel } from '../db/models/boardsModel';
//import { Types } from 'mongoose';

class BoardsService {
  boardsModel: any;
  constructor(boardsModel: any) {
    this.boardsModel = boardsModel;
  }

  async registerBoard({
    title,
    content,
    totalCount,
  }: {
    title: string;
    content: string;
    totalCount: number;
  }) {
    const createdNewBoard = await boardsModel.create({
      title,
      content,
      totalCount,
    });
    return createdNewBoard;
  }
  async getCountPages() {
    const totalPage = await this.boardsModel.findCountPages();
    return totalPage;
  }
  async getAllBoards(page: number, limit: number) {
    const boards = await this.boardsModel.findAllBoards(page, limit);
    return boards;
  }
  async getBoardData(id: string) {
    const boardData = await boardsModel.findBoardById(id);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!boardData) {
      throw new Error('해당 id의 게시글이 없습니다. 다시 한 번 확인해 주세요.');
    }

    return boardData;
  }

  async updateBoard(id: string, toUpdate: object) {
    const boardData = await boardsModel.findBoardById(id);
    const board = await boardsModel.update(id, toUpdate);
    return board;
  }
  async deletedBoard(id: string) {
    const deletedResult = await boardsModel.deletedById(id);

    if (deletedResult === 0) {
      throw new Error('게시판 삭제에 실패했습니다.');
    }

    return { result: 'Ok' };
  }
}

const boardsService = new BoardsService(boardsModel);
export { boardsService };
