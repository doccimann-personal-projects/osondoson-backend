import { inject, injectable } from 'inversify';
import { Letter } from '../domain/letter.entity';
import { CreateRequest } from './DTO/Request/letter.create.request';
import { Types } from '../../app/container/types.di';
import { AppError } from '../../misc/error/error.app';
import { commonErrors } from '../../misc/error/error.common';
import { LetterRepository } from '../domain/letter.repository';
import { LetterResponse } from './DTO/Response/letter.create.response';
import { LetterGetResponse } from './DTO/Response/letter.get.response';
@injectable()
export class LetterService {
    constructor(@inject(Types.LETTER_REPOSITORY) 
    private readonly letterRepository : LetterRepository) {}

    async create(createRequest : CreateRequest) : Promise<LetterResponse> {
        const { receiverId, content } = createRequest;
        
        return new LetterResponse ( receiverId, content );
    }
    // 쪽지 글자 수 200자 초과여부
    async isMaxContent(content : string) : Promise<boolean> {
        if(content.length > 200) {
            return true;
        }else {
            return false;
        }
    }
    async deleteLetter(id : number): Promise<string | null> {
        
        const deleteLetter = await this.letterRepository.deleteById(id);
        //삭제 실패시 false 반환    
        if(!deleteLetter) {
            return null;
        }
        return 'OK'
        
    }
    


    async getReceiverId( receiverId : number,) : Promise<LetterGetResponse | null> {
        const foundReceiver = await this.letterRepository.findById(receiverId);

        const letterReceiverResponse = 
         foundReceiver && foundReceiver.isDeletedByReceiver === false
           ? LetterGetResponse.fromEntity(foundReceiver)
           : null
        return letterReceiverResponse
    }
}