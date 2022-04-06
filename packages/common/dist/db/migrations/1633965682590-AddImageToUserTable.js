"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddImageToUserTable1633965682590 = void 0;
class AddImageToUserTable1633965682590 {
    constructor() {
        this.name = 'AddImageToUserTable1633965682590';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "image" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "image"`);
    }
}
exports.AddImageToUserTable1633965682590 = AddImageToUserTable1633965682590;
//# sourceMappingURL=1633965682590-AddImageToUserTable.js.map