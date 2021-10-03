import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1633209851433 implements MigrationInterface {
    name = 'CreateUsersTable1633209851433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "public"."users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")`);
    }

}
