import { injectable } from "inversify";
import { CreateRequest } from "../application/DTO/Request/letter.create.request";
import { Letter } from "./letter.entity";


@injectable()
export class LetterRepository {
    async create(letter : Letter) : Promise<Letter> {
        return await letter.save()
    } 
}
    