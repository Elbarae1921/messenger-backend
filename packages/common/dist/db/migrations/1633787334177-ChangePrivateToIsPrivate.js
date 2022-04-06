"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePrivateToIsPrivate1633787334177 = void 0;
class ChangePrivateToIsPrivate1633787334177 {
    constructor() {
        this.name = 'ChangePrivateToIsPrivate1633787334177';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."posts" RENAME COLUMN "private" TO "isPrivate"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."posts" RENAME COLUMN "isPrivate" TO "private"`);
    }
}
exports.ChangePrivateToIsPrivate1633787334177 = ChangePrivateToIsPrivate1633787334177;
//# sourceMappingURL=1633787334177-ChangePrivateToIsPrivate.js.map