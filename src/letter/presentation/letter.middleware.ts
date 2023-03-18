import container from '../../app/container/container';
import { LetterService } from '../application/letter.service';
import { Types } from '../../app/container/types.di';

const letterService: LetterService = container.get(Types.LETTER_SERVICE);

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
