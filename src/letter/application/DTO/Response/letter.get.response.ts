import { Letter } from "../../../domain/letter.entity";

export class LetterGetResponse {
    //id : number;

    receiverId : number;

    content : string;

    constructor( receiverId : number, content : string) {
        //this.id = id;
        this.receiverId = receiverId;
        this.content = content;
    }

    static fromEntity(letter : Letter) : LetterGetResponse {
        const { receiverId, content } = letter;

        return new LetterGetResponse( receiverId, content)
    }
}