import { injectable } from "inversify";
import { Letter } from "./letter.entity";


@injectable()
export class LetterRepository {
    async create(letter : Letter) : Promise<Letter> {
        return await letter.save();
    }
}
    