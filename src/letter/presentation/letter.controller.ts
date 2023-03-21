import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { injectable } from 'inversify';
import { Types } from '../../app/container/types.di';
import container from '../../app/container/container';
import { Request, Response, NextFunction } from 'express';
import { LetterService } from '../application/letter.service';
import { transformToNumber } from '../../misc/utils/request.util';
import { bindPaginatedResponse } from '../../misc/utils/response.util';

@injectable()
export class LetterController {
  async createLetter(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { sub } = res.locals.tokenPayload;
      const { receiverId, content } = req.body;

      const createRequest = new LetterCreateRequest(
        Number(receiverId),
        content,
      );
      const result = await letterService.create(createRequest, sub);

      res.locals.data = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  // 수신된 쪽지들을 조회하는 메소드
  async getReceivedLetterList(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { 'receiver-id': receiverId, page, limit } = req.query;

      const { sub } = res.locals.tokenPayload;

      const [numericReceiverId, numericPage, numericLimit] = transformToNumber(
        receiverId,
        page,
        limit,
      );

      const [letterResponseList, totalElements] =
        await letterService.getReceivedLetterList(
          numericReceiverId,
          sub,
          numericPage,
          numericLimit,
        );

      res.locals.dataList = letterResponseList;
      res.locals.totalElements = totalElements;

      next();
    } catch (error) {
      next(error);
    }
  }

  // 발신한 쪽지들을 조회하는 메소드
  async getSentLetterList(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { 'author-id': authorId, page, limit } = req.query;
      const { sub } = res.locals.tokenPayload;

      // 모두 숫자 타입으로 변환
      const [numericAuthorId, numericPage, numericLimit] = transformToNumber(
        authorId,
        page,
        limit,
      );

      const [letterResponseList, totalElements] =
        await letterService.getSentLetterList(
          numericAuthorId,
          sub,
          numericPage,
          numericLimit,
        );

      // 페이징 처리된 결과를 res.locals에 바인딩
      bindPaginatedResponse(res, letterResponseList, totalElements);
      next();
    } catch (error) {
      next(error);
    }
  }
}
