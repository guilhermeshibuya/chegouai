import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAndCondominium1774983719992 implements MigrationInterface {
    name = 'UpdateUserAndCondominium1774983719992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "residents" ALTER COLUMN "block" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f16db7b143367917af0979c516" ON "condominiums" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f16db7b143367917af0979c516"`);
        await queryRunner.query(`ALTER TABLE "residents" ALTER COLUMN "block" SET NOT NULL`);
    }

}
