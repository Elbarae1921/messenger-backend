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
exports.FriendRequest = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const AbstractEntity_1 = require("./AbstractEntity");
const User_1 = require("./User");
let FriendRequest = class FriendRequest extends AbstractEntity_1.AbstractEntity {
    constructor(sender, receiver) {
        super();
        this.sender = sender;
        this.receiver = receiver;
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.friendRequestsReceived, { eager: true }),
    __metadata("design:type", User_1.User)
], FriendRequest.prototype, "receiver", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => User_1.User),
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.friendRequestsSent, { eager: true }),
    __metadata("design:type", User_1.User)
], FriendRequest.prototype, "sender", void 0);
FriendRequest = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('friend_request'),
    __metadata("design:paramtypes", [User_1.User, User_1.User])
], FriendRequest);
exports.FriendRequest = FriendRequest;
//# sourceMappingURL=FriendRequest.js.map