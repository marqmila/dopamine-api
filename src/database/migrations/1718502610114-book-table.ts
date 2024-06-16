import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookTable1718502610114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE book (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title varchar(512) NOT NULL,
                author varchar(512) NOT NULL,
                number_pages integer NOT NULL,
                type_book varchar(50) NOT NULL,
                book_format varchar(50) NOT NULL,
                purchase boolean NOT NULL,
                finished_date timestamptz NOT NULL,
                CONSTRAINT book_pk PRIMARY KEY (id)
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS book;`);
  }
}
