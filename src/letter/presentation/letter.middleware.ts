import container from "../../app/container/container";
import { LetterService } from "../application/letter.service";
import { commonErrors } from "../../misc/error/error.common";
import { CreateRequest } from "../application/DTO/Request/letter.create.request";
import { Types } from "../../app/container/types.di";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../../misc/error/error.app";
import * as jwt from 'jsonwebtoken';
import { LetterResponse } from "../application/DTO/Response/letter.create.response";

const letterService : LetterService = container.get(Types.LETTER_SERVICE);
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

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
export const verifyAccessToken = async function (
req: Request,
res: Response,
next: NextFunction,
) {
try {
    res.locals.tokenPayload = jwt.verify(
    req.headers.authorization!,
    accessTokenSecret!,
    );
    next();
} catch (error) {
    sendJwtError(error, next);
}
};

export const verifyRefreshToken = async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      res.locals.tokenPayload = jwt.verify(
        req.headers.authorization!,
        refreshTokenSecret!,
      );
      next();
    } catch (error) {
      sendJwtError(error, next);
    }
  };

function sendJwtError(error: unknown, next: NextFunction) {
    const description =
      error instanceof jwt.TokenExpiredError
        ? '토큰이 만료되었습니다'
        : '유효하지 않은 토큰입니다';
  
    return next(
      new AppError(commonErrors.AUTHENTICATION_ERROR, 401, description),
    );
  }
//export const checkMsgExit = () => 
  //async (req : Request, res : Response, next : NextFunction) => {
    //const  receiverId  : any = req.params.receiverId;
    //const isExistMsg : LetterResponse = await letterService.getReceiverId(receiverId);
    //if(isExistMsg) {
      //return next(
        //new AppError(
          //commonErrors.INPUT_ERROR,204,'해당 id의 받은이가 존재하지 않습니다.'
      //)
    //)
  //}
  //next();
//}