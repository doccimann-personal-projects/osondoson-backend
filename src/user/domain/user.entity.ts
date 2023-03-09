import { BirthDate } from './vo/birthdate.vo';
import { TimestampsEntity } from './../../misc/timestamps.entity';
import { Role } from './vo/role.vo';
import { Gender } from './vo/gender.vo';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends TimestampsEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column({ type: 'varchar', length: 20 })
  password!: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  nickname!: string;

  @Column({ type: 'enum', enum: Gender })
  gender!: Gender;

  @Column(() => BirthDate)
  birthDate!: BirthDate;

  @Column({ type: 'enum', enum: Role })
  role!: Role;

  constructor(
    email: string,
    password: string,
    nickname: string,
    gender: Gender,
    birthDate: BirthDate,
    role: Role,
  ) {
    super();

    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.gender = gender;
    this.birthDate = birthDate;
    this.role = role;
  }
}
