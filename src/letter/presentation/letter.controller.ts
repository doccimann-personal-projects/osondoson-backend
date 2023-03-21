import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { injectable } from 'inversify';
import { Types } from '../../app/container/types.di';
import container from '../../app/container/container';
import { Request, Response, NextFunction } from 'express';
import { LetterService } from '../application/letter.service';
import { transformToNumber } from '../../misc/utils/request.util';

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

  async getReceivedLetterList(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { 'receiver-id': receiverId, page, limit } = req.query;

      const { sub } = res.locals.tokenPayload;

      const [numericReceiverId, numericSub, numericPage, numericLimit] =
        transformToNumber(receiverId, sub, page, limit);

      const [letterResponseList, totalElements] = await letterService.getReceivedLetterList(
        numericReceiverId,
        numericSub,
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
}
