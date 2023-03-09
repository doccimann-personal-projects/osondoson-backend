import { Column } from 'typeorm';

export class BirthDate {
  @Column()
  birthYear!: number;

  @Column()
  birthMonth!: number;
  
  @Column()
  birthDay!: number;
}
