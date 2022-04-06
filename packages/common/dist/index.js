"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.AbstractEntity = exports.Comment = exports.FriendRequest = exports.Post = exports.User = void 0;
const User_1 = require("./db/entities/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Post_1 = require("./db/entities/Post");
Object.defineProperty(exports, "Post", { enumerable: true, get: function () { return Post_1.Post; } });
const FriendRequest_1 = require("./db/entities/FriendRequest");
Object.defineProperty(exports, "FriendRequest", { enumerable: true, get: function () { return FriendRequest_1.FriendRequest; } });
const Comment_1 = require("./db/entities/Comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return Comment_1.Comment; } });
const AbstractEntity_1 = require("./db/entities/AbstractEntity");
Object.defineProperty(exports, "AbstractEntity", { enumerable: true, get: function () { return AbstractEntity_1.AbstractEntity; } });
exports.entities = [User_1.User, Post_1.Post, FriendRequest_1.FriendRequest, Comment_1.Comment];
//# sourceMappingURL=index.js.map