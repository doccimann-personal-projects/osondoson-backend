import { Column } from 'typeorm';

export class BirthDate {
  @Column({ name: 'birth_year' })
  year!: number;

  @Column({ name: 'birth_month' })
  month!: number;

  @Column({ name: 'birth_day' })
  day!: number;
}
