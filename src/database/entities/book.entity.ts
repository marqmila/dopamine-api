import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book' })
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  author: number;

  @Column({ type: 'integer', name: 'number_pages' })
  numberOfPages: number;

  @Column({ type: 'varchar', name: 'type_book' })
  typeOfBook: string;

  @Column({ type: 'varchar', name: 'book_format' })
  bookFormat: string;

  @Column({ type: 'boolean' })
  purchase: boolean;

  @Column({ type: 'timestamptz', name: 'finished_date' })
  finishedDate: Date;
}
