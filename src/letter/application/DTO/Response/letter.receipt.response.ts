export class ReceivedLetterResponse {
    id: number;

    authorId: number;

    receiverId: number;

    content: string;

    constructor(id: number, authorId: number, receiverId: number, content: string) {
        this.id = id;
        this.authorId = authorId;
        this.receiverId = receiverId;
        this.content = content;
    }
}