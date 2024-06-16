import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  director: number;

  @Column({ type: 'varchar' })
  who: string;

  @Column({ type: 'timestamptz', name: 'finished_date' })
  finishedDate: Date;
}
