import { CommentRepository } from '../domain/comment.repository';
import { inject, injectable } from 'inversify';
import { Comments } from '../domain/comment.entity';
import { RegisterCommentRequest } from './dto/request/comment.register.request';
import { UpdateCommentRequest } from './dto/request/comment.update.request';
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

  // 게시판 전체 조회
  async findAllComments(
    Id: string,
    page: number,
    limit: number,
  ): Promise<object> {
    const comments = await this.commentRepository.findAllComments(
      Id,
      page,
      limit,
    );

    return comments;
  }

  // 해당 id의 게시글 존재 여부
  async isExistId(id: string): Promise<boolean> {
    const board = await this.commentRepository.findComment(id);
    if (!board) {
      return true;
    } else {
      return false;
    }
  }

  async updateComment(
    id: string,
    updateCommentRequest: UpdateCommentRequest,
  ): Promise<string | undefined> {
    const updateComment = await this.commentRepository.updateById(
      id,
      updateCommentRequest,
    );
    return updateComment;
  }

  async deleteComment(id: string): Promise<string | undefined> {
    const deletedBoard = await this.commentRepository.deletedById(id);

    return deletedBoard;
  }
}
