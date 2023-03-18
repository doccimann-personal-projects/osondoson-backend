import { Letter } from './../../../domain/letter.entity';
import { Request } from 'express';
import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LetterCreateRequest {
  @IsString()
  @IsNotEmpty()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  content: string;

  static of(req: Request): LetterCreateRequest {
    const { receiverId, content } = req.body;

    const createRequest = new LetterCreateRequest();
    createRequest.receiverId = receiverId;
    createRequest.content = content;

    return createRequest;
  }

  toEntity(authorId: number): Letter {
    const { receiverId, content } = this;
    return new Letter(authorId, receiverId, content, false, false);
  }
}
