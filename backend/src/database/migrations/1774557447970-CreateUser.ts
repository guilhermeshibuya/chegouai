import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1774557447970 implements MigrationInterface {
    name = 'CreateUser1774557447970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_type_enum" AS ENUM('sys_admin', 'condo_admin', 'resident', 'doorperson')`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('pending', 'active', 'blocked')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "type" "public"."user_type_enum" NOT NULL DEFAULT 'resident', "status" "public"."user_status_enum" NOT NULL DEFAULT 'pending', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_type_enum"`);
    }

}
