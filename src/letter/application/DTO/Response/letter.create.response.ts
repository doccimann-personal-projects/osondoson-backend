
export class LetterResponse {
    receiverId : number;

    content : string;

    constructor( receiverId : number, content : string) {
        this.receiverId = receiverId;
        this.content = content;
    }
}