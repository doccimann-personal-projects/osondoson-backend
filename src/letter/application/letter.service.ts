import { inject, injectable } from 'inversify';
import { Letter } from '../domain/letter.entity';
import { CreateRequest } from './DTO/Request/letter.create.request';
import { Types } from '../../app/container/types.di';
import { AppError } from '../../misc/error/error.app';
import { commonErrors } from '../../misc/error/error.common';
import { LetterRepository } from '../domain/letter.repository';

@injectable()
export class LetterService {
    constructor(@inject(Types.LETTER_REPOSITORY) private readonly letterRepository : LetterRepository) {}

    async create(createRequest : CreateRequest) : Promise<string> {
        const createLetter = createRequest.toLetterEntity();
        const saveLetter = await this.letterRepository.create(createLetter)
        
        return 'OK'
    }
    // 쪽지 글자 수 200자 초과여부
    async isMaxContent(content : string) : Promise<boolean> {
        if(content.length > 200) {
            return true;
        }else {
            return false;
        }
    }

}