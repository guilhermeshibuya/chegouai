import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfilePicureUser1775514409160 implements MigrationInterface {
    name = 'AddProfilePicureUser1775514409160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePictureUrl" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePictureUrl"`);
    }

}
