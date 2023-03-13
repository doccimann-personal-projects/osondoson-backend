import { model, Types } from 'mongoose';
import { BoardsSchema } from '../schemas/boardsSchema';

interface participantInfoType {
  totalCount?: number;
  currentCount?: number;
  userIdList?: string[];
}

interface BoardsTypes {
  _id?: Types.ObjectId;
  title?: string;
  content?: number;
  authorId?: Types.ObjectId;
  participantInfo?: participantInfoType;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  lastUpdated?: Date;
}

const Boards = model<BoardsTypes>('boards', BoardsSchema);

export class BoardsModel {
  async create(boardInfo: {
    title: string;
    content: string;
    totalCount: number;
  }) {
    const { title, content, totalCount } = boardInfo;
    const createdNewBoard = await Boards.create({
      title: title,
      content: content,
      'participantInfo.totalCount': totalCount,
    });
    return createdNewBoard;
  }
  async findCountPages() {
    const countPages = await Boards.countDocuments({});
    return countPages;
  }
  async findAllPages(page: number, limit: number) {
    const boards = await Boards.find({})
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ createdAt: -1 });
    return boards;
  }
  async findBoardById(id: string) {
    const board = await Boards.findOne({ _id: id });
    return board;
  }
  async update(id: string, update: { title?: string; content?: string }) {
    const filt = { _id: id };
    const option = { returnOriginal: false };
    const updatedBoard = await Boards.findOneAndUpdate(
      filt,
      { title: update.title, content: update.content },
      option,
    );
    return updatedBoard;
  }

  async deletedById(id: string) {
    // ✨✨ 필드 살리는 방법 찾아서 넣어야함.
    const deletedResult = await Boards.deleteOne({ _id: id });
  }
}

const boardsModel = new BoardsModel();
export { boardsModel };
