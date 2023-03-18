import { inject, injectable } from 'inversify';
import { Letter } from '../domain/letter.entity';
import { LetterCreateRequest } from './dto/request/letter.create.request';
import { Types } from '../../app/container/types.di';
import { AppError } from '../../misc/error/error.app';
import { commonErrors } from '../../misc/error/error.common';
import { LetterRepository } from '../domain/letter.repository';
import { LetterCreateResponse } from './dto/response/letter.create.response';
import { LetterGetResponse } from './dto/response/letter.get.response';
@injectable()
export class LetterService {
  constructor(
    @inject(Types.LETTER_REPOSITORY)
    private readonly letterRepository: LetterRepository,
  ) {}

  async create(
    createRequest: LetterCreateRequest,
    authorId: number, 
  ): Promise<LetterCreateResponse> {
    const newLetter: Letter = createRequest.toEntity(authorId);

    const savedLetter = await this.letterRepository.create(newLetter);

    return LetterCreateResponse.fromEntity(savedLetter);
  }
  // 쪽지 글자 수 200자 초과여부
  async isMaxContent(content: string): Promise<boolean> {
    if (content.length > 200) {
      return true;
    } else {
      return false;
    }
  }
  async deleteLetter(id: number): Promise<string | null> {
    const deleteLetter = await this.letterRepository.deleteById(id);
    //삭제 실패시 false 반환
    if (!deleteLetter) {
      return null;
    }
    return 'OK';
  }

  async getReceiverId(receiverId: number): Promise<LetterGetResponse | null> {
    const foundReceiver = await this.letterRepository.findById(receiverId);

    const letterReceiverResponse =
      foundReceiver && foundReceiver.isDeletedByReceiver === false
        ? LetterGetResponse.fromEntity(foundReceiver)
        : null;
    return letterReceiverResponse;
  }
}
