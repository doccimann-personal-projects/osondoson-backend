import { Request } from 'express';
import { Letter } from '../../../domain/letter.entity';
import { IsString, IsNotEmpty, MaxLength,MinLength, IsBoolean } from 'class-validator';

export class CreateRequest {
    // @IsString()
    // authorId : string;
    
    @IsString()
    @IsNotEmpty()
    receiverId : string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(200)
    content : string;

    // @IsBoolean()
    // isDeleteByAuthor : boolean;

    // @IsBoolean()
    // isDeleteByReceiver : boolean;
    
    static of(req : Request) : CreateRequest {
        const { receiverId, content } = req.body;

        const createRequest = new CreateRequest();
        createRequest.receiverId = receiverId;
        createRequest.content = content;
        // createRequest.authorId = 'user';
        // createRequest.isDeleteByAuthor = false;
        // createRequest.isDeleteByReceiver = false;
        return createRequest;
    }

    // toLetterEntity() {
    //     const { authorId,receiverId, content, isDeleteByAuthor, isDeleteByReceiver } = this;
    //     return new Letter ( authorId, receiverId, content, isDeleteByAuthor, isDeleteByReceiver)
    // }
}