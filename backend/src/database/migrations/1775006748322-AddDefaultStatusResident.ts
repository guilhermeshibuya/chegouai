import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultStatusResident1775006748322 implements MigrationInterface {
    name = 'AddDefaultStatusResident1775006748322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "residents" ALTER COLUMN "status" SET DEFAULT 'INACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "residents" ALTER COLUMN "status" DROP DEFAULT`);
    }

}
