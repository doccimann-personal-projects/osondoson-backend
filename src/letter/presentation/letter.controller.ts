import { CreateRequest } from "../application/DTO/Request/letter.create.request";
import { injectable } from "inversify";
import { Types } from "../../app/container/types.di";
import container from "../../app/container/container";
import { Request, Response, NextFunction } from 'express';
import { LetterService } from "../application/letter.service";

@injectable()
export class LetterController {
    async makeLetter (req : Request, res : Response, next : NextFunction) {
        try {
            const letterService = container.get<LetterService>(Types.LETTER_SERVICE);
            const createRequest = CreateRequest.of(req);
            const result = await letterService.create(createRequest);

            res.locals.data = result;
            next();
        }catch (error) {
            next(error);
        }
    }
}