import { TimestampsEntity } from "../../misc/timestamps.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name : 'letters' })
export class Letter extends TimestampsEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({type: 'int'})
    authorId : number;

    @Column({type: 'int'})
    receiverId : number;

    @Column({type: 'varchar'})
    content : string;

    @Column({type: 'boolean', name: 'isDeletedByAuthor'})
    isDeletedByAuthor : boolean;

    @Column({type: 'boolean', name: 'isDeletedByReceiver'})
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