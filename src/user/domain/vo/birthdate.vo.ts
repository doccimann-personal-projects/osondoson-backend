import { Column } from 'typeorm';

export class BirthDate {
  @Column({ name: 'birth_year' })
  birthYear!: number;

  @Column({ name: 'birth_month' })
  birthMonth!: number;

  @Column({ name: 'birth_day' })
  birthDay!: number;
}
