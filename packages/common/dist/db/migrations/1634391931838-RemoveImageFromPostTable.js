"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveImageFromPostTable1634391931838 = void 0;
class RemoveImageFromPostTable1634391931838 {
    constructor() {
        this.name = 'RemoveImageFromPostTable1634391931838';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "public"."posts" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "public"."comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`);
        await queryRunner.query(`ALTER TABLE "public"."posts" ADD "image" character varying`);
        await queryRunner.query(`ALTER TABLE "public"."comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.RemoveImageFromPostTable1634391931838 = RemoveImageFromPostTable1634391931838;
//# sourceMappingURL=1634391931838-RemoveImageFromPostTable.js.map