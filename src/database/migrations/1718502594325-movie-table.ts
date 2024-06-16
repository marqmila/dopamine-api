import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1718502594325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE movie (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title varchar(512) NOT NULL,
                director varchar(512) NOT NULL,
                who varchar(50) NOT NULL,
                finished_date timestamptz NOT NULL,
                CONSTRAINT movie_pk PRIMARY KEY (id)
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS movie;`);
  }
}
