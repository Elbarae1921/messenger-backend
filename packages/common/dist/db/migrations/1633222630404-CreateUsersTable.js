"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1633222630404 = void 0;
class CreateUsersTable1633222630404 {
    constructor() {
        this.name = 'CreateUsersTable1633222630404';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.CreateUsersTable1633222630404 = CreateUsersTable1633222630404;
//# sourceMappingURL=1633222630404-CreateUsersTable.js.map