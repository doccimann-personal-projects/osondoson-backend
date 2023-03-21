import container from '../../app/container/container';
import { LetterService } from '../application/letter.service';
import { Types } from '../../app/container/types.di';

const letterService: LetterService = container.get(Types.LETTER_SERVICE);

