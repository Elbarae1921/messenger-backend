import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveImageFromPostTable1634391931838 implements MigrationInterface {
    name = 'RemoveImageFromPostTable1634391931838';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`
        );
        await queryRunner.query(`ALTER TABLE "public"."posts" DROP COLUMN "image"`);
        await queryRunner.query(
            `ALTER TABLE "public"."comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "public"."comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`
        );
        await queryRunner.query(`ALTER TABLE "public"."posts" ADD "image" character varying`);
        await queryRunner.query(
            `ALTER TABLE "public"."comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }
}
