import container from "../../app/container/container";
import { LetterService } from "../application/letter.service";
import { commonErrors } from "../../misc/error/error.common";
import { CreateRequest } from "../application/DTO/Request/letter.create.request";
import { Types } from "../../app/container/types.di";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../misc/error/error.app";

const letterService : LetterService = container.get(Types.LETTER_SERVICE);

export const checkCreatable =
  () => async(req : Request, res : Response, next : NextFunction) => {
    const createLetterRequest : CreateRequest = req.body as CreateRequest;

    //쪽지 글자수 제한(200)
    const isMaxContent : boolean = await letterService.isMaxContent(
        createLetterRequest.content,
    );
    if(isMaxContent) {
        return next(
            new AppError(
                commonErrors.INPUT_ERROR,400,'쪽지는 200자까지만 허용합니다.'
            )
        )
    }
    next();
  }