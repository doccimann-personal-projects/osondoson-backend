import { TimestampsEntity } from "../../misc/timestamps.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : 'letters' })
export class Letter extends TimestampsEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    authorId : number;

    @Column()
    receiverId : number;

    @Column()
    content : string;

    @Column()
    isDeletedByAuthor : boolean;

    @Column()
    isDeletedByReceiver : boolean;

    constructor(
        authorId : number,
        receiverId : number,
        content : string,
        isDeletedByAuthor : boolean,
        isDeletedByReceiver : boolean,
    ) {
        super();

        this.authorId = authorId;
        this.receiverId = receiverId;
        this.content = content;
        this.isDeletedByAuthor = isDeletedByAuthor;
        this.isDeletedByReceiver = isDeletedByReceiver;
    }
}