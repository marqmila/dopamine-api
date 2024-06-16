import { MigrationInterface, QueryRunner } from 'typeorm';

export class SerieTable1718502585941 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE serie (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title varchar(512) NOT NULL,
                season integer NOT NULL,
                who varchar(50) NOT NULL,
                finished_date timestamptz NOT NULL,
                CONSTRAINT serie_pk PRIMARY KEY (id)
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS serie;`);
  }
}
