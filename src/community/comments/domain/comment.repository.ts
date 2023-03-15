import { Comments } from './comment.entity';
import { injectable } from 'inversify';

@injectable()
export class CommentRepository {
  async create(commentInfo: {
    boardId: string;
    content: string;
  }): Promise<string | undefined> {
    const content: string = commentInfo.content;
    const boardId: string = commentInfo.boardId;
    const createdNewComment = await Comments.create({
      content: content,
      boardId: boardId,
    });
    if (!createdNewComment) {
      return;
    }
    return 'Ok';
  }
  /* 
  async findAllBoards(page: number, limit: number): Promise<object> {
    const boards = await Boards.find({ isDeleted: false })
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ createdAt: -1 });
    return boards;
  }

  async findBoard(id: string): Promise<object | undefined> {
    const board = await Boards.findOne({ _id: id });
    if (!board) {
      return;
    }
    if (board.isDeleted == true) {
      return;
    }
    return board;
  }

  async findBoardById(id: string): Promise<object> {
    const board: any = await Boards.findOne({ _id: id });

    const result: object = {
      _id: board._id,
      title: board.title,
      content: board.content,
      participantInfo: board.participantInfo,
    };

    return result;
  }

  async updateById(
    id: string,
    updated: { title?: string; content?: string },
  ): Promise<object | undefined> {
    //✨const authorId = Boards.findOne(authorId);

    const filt = { _id: id };
    const option = { returnOriginal: false };

    const updatedBoard = await Boards.findOneAndUpdate(
      filt,
      { title: updated.title, content: updated.content },
      option,
    );
    if (!updatedBoard) {
      return;
    }
    const result: object = {
      _id: updatedBoard._id,
      title: updatedBoard.title,
      content: updatedBoard.content,
      participantInfo: updatedBoard.participantInfo,
    };
    return result;
  }

  async deletedById(id: string): Promise<string | undefined> {
    const board = await Boards.findOne({ _id: id });
    if (!board) {
      return;
    }
    const filt = { _id: id };
    const option = { returnOriginal: false }; // false-> 바로 출력
    const deletedAndupdate = await Boards.findOneAndUpdate(
      filt,
      {
        $unset: {
          title: '',
          content: '',
          authorId: '',
          createdAt: '',
          participantInfo: '',
        },
        $set: { deletedAt: Date.now(), isDeleted: true },
      },
      option,
    );

    if (!deletedAndupdate) {
      return;
    }

    return 'Ok';
  }

  async joinedBoard(id: string): Promise<object | undefined> {
    const board = await Boards.findOne({ _id: id });
    if (
      board?.participantInfo?.totalCount &&
      board.participantInfo.currentCount
    ) {
      if (
        Number(board.participantInfo.totalCount) <=
        Number(board.participantInfo.currentCount)
      ) {
        return;
      }
    }
    const filt = { _id: id };
    const option = { returnOriginal: false };
    const joinedBoard = await Boards.findOneAndUpdate(
      filt,
      {
        $inc: {
          'participantInfo.currentCount': 1,
        },
        $push: {
          'participantInfo.userIdList': 'test',
          //✨ userId를 추가,
        },
      },
      option,
    );
    if (!joinedBoard) {
      return;
    }
    const result = {
      _id: joinedBoard._id,
      title: joinedBoard.title,
      content: joinedBoard.content,
      participantInfo: joinedBoard.participantInfo,
    };
    return result;
  } */
}
const commentRepository = new CommentRepository();
export { commentRepository };
