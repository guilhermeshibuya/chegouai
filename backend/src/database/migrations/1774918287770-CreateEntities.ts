import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1774918287770 implements MigrationInterface {
    name = 'CreateEntities1774918287770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."residents_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`);
        await queryRunner.query(`CREATE TABLE "residents" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "cpf" character varying NOT NULL, "phone" character varying(11) NOT NULL, "apartment" character varying NOT NULL, "block" character varying NOT NULL, "status" "public"."residents_status_enum" NOT NULL, "userId" uuid, "condominiumId" uuid, CONSTRAINT "REL_3b7ff30eaf080e784c2a3492f3" UNIQUE ("userId"), CONSTRAINT "PK_4c8d0413ee0e9a4ebbf500f7365" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f08718adead8bca6fca84bc06b" ON "residents" ("cpf", "condominiumId") `);
        await queryRunner.query(`CREATE TYPE "public"."staff_role_enum" AS ENUM('condo_admin', 'doorperson')`);
        await queryRunner.query(`CREATE TABLE "staff" ("id" uuid NOT NULL, "role" "public"."staff_role_enum" NOT NULL, "phone" character varying(11) NOT NULL, "userId" uuid, "condominiumId" uuid, CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pickups" ("id" uuid NOT NULL, "pickupDate" TIMESTAMP WITH TIME ZONE NOT NULL, "signatureUrl" character varying, "notes" character varying, "recepientName" character varying, "packageId" uuid, "staffId" uuid, CONSTRAINT "REL_86db91b9ac7dd5e08fb7fc8dc3" UNIQUE ("packageId"), CONSTRAINT "PK_e1151cd3c046633d96998376f28" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."packages_status_enum" AS ENUM('pending', 'picked_up', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "packages" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "imageUrL" character varying, "description" character varying, "status" "public"."packages_status_enum" NOT NULL DEFAULT 'pending', "receiptDate" TIMESTAMP WITH TIME ZONE NOT NULL, "carrier" character varying, "locationHint" character varying, "trackingCode" character varying, "residentId" uuid, "staffId" uuid, "condominiumId" uuid, CONSTRAINT "PK_020801f620e21f943ead9311c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "condominiums" ("id" uuid NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "name" character varying NOT NULL, "code" character varying NOT NULL, "cnpj" character varying(14) NOT NULL, CONSTRAINT "UQ_72b384c406b4575f20c517d20f5" UNIQUE ("cnpj"), CONSTRAINT "PK_bb7509828f6270f35097b88e752" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" uuid NOT NULL, "action" character varying NOT NULL, "tableName" character varying NOT NULL, "recordId" character varying NOT NULL, "oldValues" jsonb NOT NULL, "newValues" jsonb NOT NULL, "ipAddress" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" uuid, "condominiumId" uuid, CONSTRAINT "REL_351510f0455d3b965815ce2e29" UNIQUE ("condominiumId"), CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."users_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying(11) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isSysAdmin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum" RENAME TO "users_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum" AS ENUM('pending', 'active', 'inactive')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum" USING "status"::"text"::"public"."users_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "residents" ADD CONSTRAINT "FK_3b7ff30eaf080e784c2a3492f32" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "residents" ADD CONSTRAINT "FK_f20dabb7c5cd58cd189b1c0f9e2" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "staff" ADD CONSTRAINT "FK_7360efd0f1cf390d6c972835410" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pickups" ADD CONSTRAINT "FK_86db91b9ac7dd5e08fb7fc8dc31" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pickups" ADD CONSTRAINT "FK_bbaf1749dd01274afec99c7d998" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packages" ADD CONSTRAINT "FK_6b316f64a7df4bf582f2184aefc" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packages" ADD CONSTRAINT "FK_1ca7841d429c764318bd93dee4a" FOREIGN KEY ("staffId") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "packages" ADD CONSTRAINT "FK_c9754ab5702e26b2a6569d378fe" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_351510f0455d3b965815ce2e29f" FOREIGN KEY ("condominiumId") REFERENCES "condominiums"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_351510f0455d3b965815ce2e29f"`);
        await queryRunner.query(`ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_cfa83f61e4d27a87fcae1e025ab"`);
        await queryRunner.query(`ALTER TABLE "packages" DROP CONSTRAINT "FK_c9754ab5702e26b2a6569d378fe"`);
        await queryRunner.query(`ALTER TABLE "packages" DROP CONSTRAINT "FK_1ca7841d429c764318bd93dee4a"`);
        await queryRunner.query(`ALTER TABLE "packages" DROP CONSTRAINT "FK_6b316f64a7df4bf582f2184aefc"`);
        await queryRunner.query(`ALTER TABLE "pickups" DROP CONSTRAINT "FK_bbaf1749dd01274afec99c7d998"`);
        await queryRunner.query(`ALTER TABLE "pickups" DROP CONSTRAINT "FK_86db91b9ac7dd5e08fb7fc8dc31"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_7360efd0f1cf390d6c972835410"`);
        await queryRunner.query(`ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`);
        await queryRunner.query(`ALTER TABLE "residents" DROP CONSTRAINT "FK_f20dabb7c5cd58cd189b1c0f9e2"`);
        await queryRunner.query(`ALTER TABLE "residents" DROP CONSTRAINT "FK_3b7ff30eaf080e784c2a3492f32"`);
        await queryRunner.query(`CREATE TYPE "public"."users_status_enum_old" AS ENUM('pending', 'active', 'blocked')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" TYPE "public"."users_status_enum_old" USING "status"::"text"::"public"."users_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."users_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_status_enum_old" RENAME TO "users_status_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isSysAdmin"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`CREATE TYPE "public"."users_type_enum" AS ENUM('sys_admin', 'condo_admin', 'resident', 'doorperson')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "type" "public"."users_type_enum" NOT NULL DEFAULT 'resident'`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TABLE "condominiums"`);
        await queryRunner.query(`DROP TABLE "packages"`);
        await queryRunner.query(`DROP TYPE "public"."packages_status_enum"`);
        await queryRunner.query(`DROP TABLE "pickups"`);
        await queryRunner.query(`DROP TABLE "staff"`);
        await queryRunner.query(`DROP TYPE "public"."staff_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f08718adead8bca6fca84bc06b"`);
        await queryRunner.query(`DROP TABLE "residents"`);
        await queryRunner.query(`DROP TYPE "public"."residents_status_enum"`);
    }

}
