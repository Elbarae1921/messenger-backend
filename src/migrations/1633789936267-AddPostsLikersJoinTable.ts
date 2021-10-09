import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPostsLikersJoinTable1633789936267 implements MigrationInterface {
    name = 'AddPostsLikersJoinTable1633789936267'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts_likers_users" ("postsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_e3749448c0e7b15b82e6b16d6a4" PRIMARY KEY ("postsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_542886dd295ed4b1b345f39272" ON "posts_likers_users" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0c6e02a6657407e1f0699bd15e" ON "posts_likers_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "posts_likers_users" ADD CONSTRAINT "FK_542886dd295ed4b1b345f392728" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_likers_users" ADD CONSTRAINT "FK_0c6e02a6657407e1f0699bd15eb" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_likers_users" DROP CONSTRAINT "FK_0c6e02a6657407e1f0699bd15eb"`);
        await queryRunner.query(`ALTER TABLE "posts_likers_users" DROP CONSTRAINT "FK_542886dd295ed4b1b345f392728"`);
        await queryRunner.query(`DROP INDEX "IDX_0c6e02a6657407e1f0699bd15e"`);
        await queryRunner.query(`DROP INDEX "IDX_542886dd295ed4b1b345f39272"`);
        await queryRunner.query(`DROP TABLE "posts_likers_users"`);
    }

}
