import { commonErrors } from './../../misc/error/error.common';
import { AppError } from './../../misc/error/error.app';
import { UserService } from './../../user/application/user.service';
import container from '../../app/container/container';
import { LetterService } from '../application/letter.service';
import { Types } from '../../app/container/types.di';
import { Request, NextFunction, Response } from 'express';

const letterService = container.get<LetterService>(Types.LETTER_SERVICE);
const userService = container.get<UserService>(Types.USER_SERVICE);

export const checkLetterCreatable = async function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { receiverId, content } = req.body;

  // receiverId에 대응하는 유저가 실제 존재하는지를 검증한다
  const receiver = await userService.getProfileByUserId(Number(receiverId));

  if (!receiver) {
    return next(
      new AppError(commonErrors.INPUT_ERROR, 400, '수신자가 올바르지 않습니다'),
    );
  }

  next();
};
