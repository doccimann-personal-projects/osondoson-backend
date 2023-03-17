export class LetterResponse {
    receiverId : string;
    content  : string;

    constructor(receiverId : string, content : string) {
        this.receiverId = receiverId;
        this.content = content;
    }
}