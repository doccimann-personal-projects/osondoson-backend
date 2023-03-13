import mongoose from 'mongoose';

const BoardsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    participantInfo: {
      totalCount: {
        type: Number,
      },
      currentCount: {
        type: Number,
        default: 1,
      },
      userIdList: [
        {
          type: String,
          // default: '?'
        },
      ],
    },
    authorId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
      required: false,
    },
  },
  {
    collection: 'boards',
    timestamps: true,
  },
);

export { BoardsSchema };

/*
	id: number;
	title: string;
	content: string;
	participantInfo: { totalCount: number, currentCount: number, userIdList: string[] }
	authorId: string;
  createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
	isDeleted: boolean;
*/
