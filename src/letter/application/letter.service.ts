import { ReceivedLetterResponse } from './dto/response/letter.receipt.response';
import { inject, injectable } from 'inversify';
import { Letter } from '../domain/letter.entity';
import { LetterCreateRequest } from './dto/request/letter.create.request';
import { Types } from '../../app/container/types.di';
import { AppError } from '../../misc/error/error.app';
import { commonErrors } from '../../misc/error/error.common';
import { LetterRepository } from '../domain/letter.repository';
import { LetterCreateResponse } from './dto/response/letter.create.response';

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

  async deleteAuLetter(id: number): Promise<string | null> {
    const deleteLetter = await this.letterRepository.deleteAuById(id);
    //삭제 실패시 null 반환
    if (!deleteLetter) {
      return null;
    }
    return 'OK';
  }

  //받은 쪽지의 목록을 반환하는 메소드
  async getReceivedLetterList(
    receiverId: number,
    sub: number,
    page: number,
    limit: number,
  ): Promise<[ReceivedLetterResponse[], number]> {
    // 토큰에 있는 userId 와 param으로 부터 받아온 receiverId가 일치하지 않으면 예외 처리
    if (receiverId !== sub) {
      throw new AppError(
        commonErrors.INPUT_ERROR,
        400,
        '잘못된 유저 정보입니다.',
      );
    }

    const [letterList, letterCount] =
      await this.letterRepository.findReceivedLetters(receiverId, page, limit);

    const letterResponseList = letterList?.map(
      ({ id, authorId, receiverId, content }) =>
        new ReceivedLetterResponse(id, authorId, receiverId, content),
    );

    return [letterResponseList, letterCount];
  }
}
