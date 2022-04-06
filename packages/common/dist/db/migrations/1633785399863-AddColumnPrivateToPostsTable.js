"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnPrivateToPostsTable1633785399863 = void 0;
class AddColumnPrivateToPostsTable1633785399863 {
    constructor() {
        this.name = 'AddColumnPrivateToPostsTable1633785399863';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."posts" ADD "private" boolean NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."posts" DROP COLUMN "private"`);
    }
}
exports.AddColumnPrivateToPostsTable1633785399863 = AddColumnPrivateToPostsTable1633785399863;
//# sourceMappingURL=1633785399863-AddColumnPrivateToPostsTable.js.map