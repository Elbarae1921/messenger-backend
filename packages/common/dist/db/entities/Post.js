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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const AbstractEntity_1 = require("./AbstractEntity");
const User_1 = require("./User");
const Comment_1 = require("./Comment");
let Post = class Post extends AbstractEntity_1.AbstractEntity {
    constructor(content, user, isPrivate) {
        super();
        this.content = content;
        this.user = user;
        this.isPrivate = isPrivate;
    }
    likes(parent) {
        return parent.likers.length;
    }
    addLike(user) {
        if (!this.likers.find(liker => liker.id === user.id)) {
            this.likers.push(user);
        }
    }
    removeLike(user) {
        this.likers = this.likers.filter(liker => liker.id !== user.id);
    }
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Post.prototype, "isPrivate", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.posts, { eager: true }),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [User_1.User]),
    (0, typeorm_1.ManyToMany)(() => User_1.User, user => user.likedPosts, { eager: true }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Post.prototype, "likers", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Comment_1.Comment]),
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, comment => comment.post, { eager: true }),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post]),
    __metadata("design:returntype", Number)
], Post.prototype, "likes", null);
Post = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('posts'),
    __metadata("design:paramtypes", [String, User_1.User, Boolean])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map