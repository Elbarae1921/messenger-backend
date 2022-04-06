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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const AbstractEntity_1 = require("./AbstractEntity");
const type_graphql_1 = require("type-graphql");
const Post_1 = require("./Post");
const FriendRequest_1 = require("./FriendRequest");
let User = User_1 = class User extends AbstractEntity_1.AbstractEntity {
    constructor(firstName, lastName, email, password) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.image = `${process.env.DICEBEAR_URL}${Date.now()}${this.firstName}${this.lastName}.svg`;
    }
    fullName(parent) {
        return parent.firstName + ' ' + parent.lastName;
    }
    async acceptFriendRequest(friendRequest, sender) {
        (await this.friends).push(friendRequest.sender);
        (await sender.friends).push(this);
        await friendRequest.remove();
        await sender.save();
        await this.save();
    }
    async hashPassword() {
        this.password = await (0, bcrypt_1.hash)(this.password, Number(process.env.BCRYPT_ROUNDS) || 12);
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", String)
], User.prototype, "fullName", null);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "image", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.Post, post => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Post_1.Post, post => post.likers),
    __metadata("design:type", Array)
], User.prototype, "likedPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FriendRequest_1.FriendRequest, friendRequest => friendRequest.receiver),
    __metadata("design:type", Promise)
], User.prototype, "friendRequestsReceived", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FriendRequest_1.FriendRequest, friendRequest => friendRequest.sender),
    __metadata("design:type", Promise)
], User.prototype, "friendRequestsSent", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1, user => user.friends, { lazy: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Promise)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = User_1 = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('users'),
    __metadata("design:paramtypes", [String, String, String, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map