import { LetterCreateRequest } from '../application/dto/request/letter.create.request';
import { injectable } from 'inversify';
import { Types } from '../../app/container/types.di';
import container from '../../app/container/container';
import { Request, Response, NextFunction } from 'express';
import { LetterService } from '../application/letter.service';

@injectable()
export class LetterController {
  async makeLetter(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { sub } = res.locals.tokenPayload;

      const createRequest = LetterCreateRequest.of(req);
      const result = await letterService.create(createRequest, sub);

      res.locals.data = result;
      next();
    } catch (error) {
      next(error);
    }
  }

  async deleteLetter(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);

      const { id } = req.params;
      const { sub } = res.locals.tokenPayload;

      const deleteResponse = await letterService.deleteLetter(Number(id));
      res.locals.data = deleteResponse;
      next();
    } catch (error) {
      next(error);
    }
  }
  async getLetter(req: Request, res: Response, next: NextFunction) {
    try {
      const letterService = container.get<LetterService>(Types.LETTER_SERVICE);
      const { sub } = res.locals.tokenPayload;
      const messageResponse = await letterService.getReceiverId(sub);
      res.locals.data = messageResponse;
      next();
    } catch (error) {
      next(error);
    }
  }
}
