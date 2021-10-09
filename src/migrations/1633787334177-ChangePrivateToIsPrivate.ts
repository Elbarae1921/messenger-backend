import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePrivateToIsPrivate1633787334177 implements MigrationInterface {
    name = 'ChangePrivateToIsPrivate1633787334177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" RENAME COLUMN "private" TO "isPrivate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" RENAME COLUMN "isPrivate" TO "private"`);
    }

}
