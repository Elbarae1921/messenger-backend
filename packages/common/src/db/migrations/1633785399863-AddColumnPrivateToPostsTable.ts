import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnPrivateToPostsTable1633785399863 implements MigrationInterface {
    name = 'AddColumnPrivateToPostsTable1633785399863';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" ADD "private" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."posts" DROP COLUMN "private"`);
    }
}
