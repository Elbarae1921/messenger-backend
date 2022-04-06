import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFriendRequestsAndFriends1633812065954 implements MigrationInterface {
    name = 'AddFriendRequestsAndFriends1633812065954';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "receiverId" integer, "senderId" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`
        );
        await queryRunner.query(
            `CREATE TABLE "users_friends_users" ("usersId_1" integer NOT NULL, "usersId_2" integer NOT NULL, CONSTRAINT "PK_d0b93e07874c78c16bdf28a24ca" PRIMARY KEY ("usersId_1", "usersId_2"))`
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_a3b73d9dd6e964868c76294b77" ON "users_friends_users" ("usersId_1") `
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_6803c4075d7779e2e27d6b14c3" ON "users_friends_users" ("usersId_2") `
        );
        await queryRunner.query(
            `ALTER TABLE "friend_request" ADD CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "friend_request" ADD CONSTRAINT "FK_9509b72f50f495668bae3c0171c" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE "users_friends_users" ADD CONSTRAINT "FK_a3b73d9dd6e964868c76294b77c" FOREIGN KEY ("usersId_1") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "users_friends_users" ADD CONSTRAINT "FK_6803c4075d7779e2e27d6b14c34" FOREIGN KEY ("usersId_2") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "users_friends_users" DROP CONSTRAINT "FK_6803c4075d7779e2e27d6b14c34"`
        );
        await queryRunner.query(
            `ALTER TABLE "users_friends_users" DROP CONSTRAINT "FK_a3b73d9dd6e964868c76294b77c"`
        );
        await queryRunner.query(
            `ALTER TABLE "friend_request" DROP CONSTRAINT "FK_9509b72f50f495668bae3c0171c"`
        );
        await queryRunner.query(
            `ALTER TABLE "friend_request" DROP CONSTRAINT "FK_470e723fdad9d6f4981ab2481eb"`
        );
        await queryRunner.query(`DROP INDEX "IDX_6803c4075d7779e2e27d6b14c3"`);
        await queryRunner.query(`DROP INDEX "IDX_a3b73d9dd6e964868c76294b77"`);
        await queryRunner.query(`DROP TABLE "users_friends_users"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
    }
}
