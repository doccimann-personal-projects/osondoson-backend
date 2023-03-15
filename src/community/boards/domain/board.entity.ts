import mongoose from 'mongoose';

const Board = new mongoose.Schema(
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
          // 수정 예정
          default: '작성자',
        },
      ],
    },
    authorId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

interface participantInfoType {
  totalCount?: number;
  currentCount?: number;
  userIdList?: string[];
}

interface BoardsTypes {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  authorId?: string;
  participantInfo?: participantInfoType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
}

export const Boards = mongoose.model<BoardsTypes>('boards', Board);
