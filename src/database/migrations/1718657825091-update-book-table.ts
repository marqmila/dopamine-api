import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateBookTable1718657825091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE book ALTER COLUMN purchase DROP NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS book;`);
  }
}
