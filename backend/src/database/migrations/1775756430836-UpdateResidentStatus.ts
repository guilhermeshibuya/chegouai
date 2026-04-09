import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateResidentStatus1775756430836 implements MigrationInterface {
  name = 'UpdateResidentStatus1775756430836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" TYPE TEXT`,
    );
    await queryRunner.query(
      `UPDATE "residents" SET "status" = LOWER("status")`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."residents_status_enum" RENAME TO "residents_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."residents_status_enum" AS ENUM('active', 'inactive', 'pending', 'rejected')`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" TYPE "public"."residents_status_enum" USING "status"::"text"::"public"."residents_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" SET DEFAULT 'pending'`,
    );
    await queryRunner.query(`DROP TYPE "public"."residents_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."residents_status_enum_old" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" TYPE "public"."residents_status_enum_old" USING "status"::"text"::"public"."residents_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`,
    );
    await queryRunner.query(`DROP TYPE "public"."residents_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."residents_status_enum_old" RENAME TO "residents_status_enum"`,
    );
  }
}
