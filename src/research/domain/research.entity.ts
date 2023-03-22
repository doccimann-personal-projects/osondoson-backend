import mongoose from 'mongoose';

const research1 = new mongoose.Schema(
  {
    1: {
      행정구역별: {
        type: String,
      },
      2017: {
        type: Number,
      },
      2018: { type: Number },
    },
    2: {
      행정구역별: {
        type: String,
      },
      2017: {
        type: Number,
      },
      2018: { type: Number },
    },
  },
  {
    collection: 'research1',
  },
);
/* 
export interface Research1 {
  _id: mongoose.Types.ObjectId;
  title: string;
  content: string;
  authorId?: string;
  participantInfo: {
    totalCount: number;
    currentCount: number;
    userIdList: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
} */

export const Research1 = mongoose.model('research1', research1);
