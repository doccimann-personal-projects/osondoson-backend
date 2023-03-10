import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class TimestampsEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null = null;

  // 기본 값은 null로 설정
  @DeleteDateColumn()
  deletedAt: Date | null = null;

  // 기본 값은 false로 설정
  isDeleted: boolean = false;
}
