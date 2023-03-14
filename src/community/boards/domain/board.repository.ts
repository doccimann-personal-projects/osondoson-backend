import { Boards } from './board.entity';
import { injectable } from 'inversify';
//여기까지는 맞는거 같은데 그 뭐야 로직 검사 어디서 하니..?

@injectable()
export class BoardRepository {
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

    const result: object = {
      _id: createdNewBoard._id,
      title: createdNewBoard.title,
      content: createdNewBoard.content,
      participantInfo: createdNewBoard.participantInfo,
    };
    return result;
  }

  async findCountPages() {
    const countPages = await Boards.countDocuments({});
    return countPages;
  }
  async findAllBoards(page: number, limit: number) {
    const boards = await Boards.find({ isDeleted: false })
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ createdAt: -1 });
    return boards;
  }

  async findBoardById(id: string) {
    const board = await Boards.findOne({ _id: id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    // 후에 체크 해야 할 듯.
    if (!board) {
      throw new Error('해당 id의 게시글이 없습니다');
    }

    return {
      _id: board._id,
      title: board.title,
      content: board.content,
      participantInfo: board.participantInfo,
    };
  }
  async update(id: string, updated: { title?: string; content?: string }) {
    const filt = { _id: id };
    //✨✨다른 정보 어떻게 갖고오니..쿼리 날린 user의 아이디?
    //const authorId = Boards.findOne(authorId);
    const option = { returnOriginal: false };

    const updatedBoard = await Boards.findOneAndUpdate(
      filt,
      { title: updated.title, content: updated.content },
      option,
    );
    if (!updatedBoard) {
      return;
    }
    return {
      _id: updatedBoard._id,
      title: updatedBoard.title,
      content: updatedBoard.content,
      participantInfo: updatedBoard.participantInfo,
    };
  }

  async deletedById(id: string) {
    this.findBoardById(id);
    const deletedAndupdate = await Boards.findOneAndUpdate(
      { _id: id },
      {
        $unset: {
          title: '',
          content: '',
          authorId: '',
          createdAt: '',
          //participantInfo 삭제 안됨. 확인해야함.
          participantInfo: '',
        },
        $set: { deletedAt: Date.now(), isDeleted: true },
      },
    );

    return deletedAndupdate;
  }

  async joinedBoard(id: string) {
    //🎀여기에서 만약에 사전 신청 수랑 currentCount가 같으면 에러 표시?

    const board = await Boards.findOne({ _id: id });
    // db에서 찾지 못한 경우, 에러 메시지 반환
    // 후에 체크 해야 할 듯.
    /*     if (!board) {
      throw new Error('No content', 204, '해당 id의 게시글이 없습니다');
    } */
    /*     if (
        board.participantInfo?.currentCount >= board.participantInfo?.totalCount
      ) {
        throw new AppError('모집 완료', 204, '모집 인원이 찼습니다.');
      } */
    const joinedBoard = await Boards.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          // 갯수 더하기
          'participantInfo.currentCount': 1,
        },
        $push: { 'participantInfo.userIdList': 'test' },
      },
    );
    if (!joinedBoard) {
      return;
    }
    return {
      _id: joinedBoard._id,
      title: joinedBoard.title,
      content: joinedBoard.content,
      participantInfo: joinedBoard.participantInfo,
    };
  }
}
const boardRepository = new BoardRepository();
export { boardRepository };
