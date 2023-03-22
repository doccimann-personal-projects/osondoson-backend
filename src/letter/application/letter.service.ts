import { GetLetterResponse } from './dto/response/letter.view.response';
import { inject, injectable } from 'inversify';
import { Letter } from '../domain/letter.entity';
import { LetterCreateRequest } from './dto/request/letter.create.request';
import { Types } from '../../app/container/types.di';
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
    userId: number,
  ): Promise<LetterCreateResponse> {
    const newLetter: Letter = createRequest.toEntity(userId);

    const savedLetter = await this.letterRepository.create(newLetter);

    return LetterCreateResponse.fromEntity(savedLetter);
  }

  //받은 쪽지의 목록을 반환하는 메소드
  async getReceivedLetterList(
    receiverId: number,
    page: number,
    limit: number,
  ): Promise<[GetLetterResponse[], number]> {
    const [letterList, letterCount] =
      await this.letterRepository.findReceivedLetters(receiverId, page, limit);

    const letterResponseList = letterList?.map(
      ({ id, authorId, receiverId, content }) =>
        new GetLetterResponse(id, authorId, receiverId, content),
    );

    return [letterResponseList, letterCount];
  }

  // 보낸 쪽지의 목록을 반환하는 메소드
  async getSentLetterList(
    authorId: number,
    page: number,
    limit: number,
  ): Promise<[GetLetterResponse[], number]> {
    const [letterList, letterCount] =
      await this.letterRepository.findSentLetters(authorId, page, limit);

    const letterResponseList = letterList?.map(
      ({ id, authorId, receiverId, content }) =>
        new GetLetterResponse(id, authorId, receiverId, content),
    );

    return [letterResponseList, letterCount];
  }

  // 받은 쪽지를 삭제하는 메소드
  async deleteReceivedLetter(letterId: number): Promise<string | null> {
    const deletedLetter = await this.letterRepository.deleteReceivedLetter(
      letterId,
    );

    return deletedLetter ? 'OK' : null;
  }

  // 보낸 편지를 삭제하는 메소드
  async deleteSentLetter(letterId: number): Promise<string | null> {
    const deletedLetter = await this.letterRepository.deleteSentLetter(
      letterId,
    );

    return deletedLetter ? 'OK' : null;
  }
}
