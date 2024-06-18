import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBookTable21718659987044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE book ALTER COLUMN finished_date DROP NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS book;`);
  }
}
