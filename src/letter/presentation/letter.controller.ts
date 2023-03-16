import { CreateRequest } from "../application/DTO/Request/letter.create.request";
import { injectable } from "inversify";
import { Types } from "../../app/container/types.di";
import container from "../../app/container/container";
import { Request, Response, NextFunction } from 'express';

@injectable()
export class LetterController {
    async makeLetter (req : Request, res : Response, next : NextFunction) {
        
    }
}