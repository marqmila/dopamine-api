import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'serie' })
export class SerieEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'integer' })
  season: number;

  @Column({ type: 'varchar' })
  who: string;

  @Column({ type: 'timestamptz', name: 'finished_date' })
  finishedDate: Date;
}
