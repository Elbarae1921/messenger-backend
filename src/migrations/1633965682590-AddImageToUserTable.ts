import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageToUserTable1633965682590 implements MigrationInterface {
    name = 'AddImageToUserTable1633965682590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "image"`);
    }

}
