import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCondominiumAndStaffEntity1775592539546 implements MigrationInterface {
  name = 'UpdateCondominiumAndStaffEntity1775592539546';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "condominiums" ADD "adminToken" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "condominiums" ADD CONSTRAINT "UQ_7a40e6b5900aff6d42a2fb11c43" UNIQUE ("adminToken")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "cpf" character varying(11) NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f08718adead8bca6fca84bc06b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "cpf" TYPE character varying(11)`,
    );
    await queryRunner.query(
      `ALTER TABLE "residents" ALTER COLUMN "cpf" SET NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f08718adead8bca6fca84bc06b" ON "residents" ("cpf", "condominiumId") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_57c06a7acd9ffbf83a00563889" ON "staff" ("cpf", "condominiumId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_57c06a7acd9ffbf83a00563889"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f08718adead8bca6fca84bc06b"`,
    );
    await queryRunner.query(`ALTER TABLE "residents" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "residents" ADD "cpf" character varying NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_f08718adead8bca6fca84bc06b" ON "residents" ("condominiumId", "cpf") `,
    );
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "condominiums" DROP CONSTRAINT "UQ_7a40e6b5900aff6d42a2fb11c43"`,
    );
    await queryRunner.query(
      `ALTER TABLE "condominiums" DROP COLUMN "adminToken"`,
    );
  }
}
