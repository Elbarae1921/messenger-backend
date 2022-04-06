"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractEntity = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const timestampType_1 = require("../utils/timestampType");
let AbstractEntity = class AbstractEntity extends typeorm_1.BaseEntity {
    constructor() {
        super();
    }
    beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
    }
    beforeUpdate() {
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], AbstractEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: (0, timestampType_1.timestamp)()
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: (0, timestampType_1.timestamp)()
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({
        name: 'deleted_at',
        type: (0, timestampType_1.timestamp)()
    }),
    __metadata("design:type", Date)
], AbstractEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbstractEntity.prototype, "beforeInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AbstractEntity.prototype, "beforeUpdate", null);
AbstractEntity = __decorate([
    (0, type_graphql_1.ObjectType)(),
    __metadata("design:paramtypes", [])
], AbstractEntity);
exports.AbstractEntity = AbstractEntity;
//# sourceMappingURL=AbstractEntity.js.map