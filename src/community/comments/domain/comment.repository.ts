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

  async findAllComments(
    Id: string,
    page: number,
    limit: number,
  ): Promise<object> {
    const comments = await Comments.find({ boardId: Id, isDeleted: false })
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ createdAt: 1 });
    return comments;
  }

  async findComment(id: string): Promise<object | undefined> {
    const comment = await Comments.findOne({ _id: id });
    if (!comment) {
      return;
    }
    if (comment.isDeleted == true) {
      return;
    }
    return comment;
  }

  async updateById(
    id: string,
    updated: { content: string },
  ): Promise<string | undefined> {
    //✨authorId

    const filt = { _id: id };
    const option = { returnOriginal: false };

    const updatedComment = await Comments.findOneAndUpdate(
      filt,
      { content: updated.content },
      option,
    );
    if (!updatedComment) {
      return;
    }

    return 'Ok';
  }

  async deletedById(id: string): Promise<string | undefined> {
    const comment = await Comments.findOne({ _id: id });
    if (!comment) {
      return;
    }
    const filt = { _id: id };
    const option = { returnOriginal: false }; // false-> 바로 출력
    const deletedAndupdate = await Comments.findOneAndUpdate(
      filt,
      {
        $unset: {
          content: '',
          authorId: '',
          createdAt: '',
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
}
const commentRepository = new CommentRepository();
export { commentRepository };
