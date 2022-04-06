import { User } from './db/entities/User';
import { Post } from './db/entities/Post';
import { FriendRequest } from './db/entities/FriendRequest';
import { Comment } from './db/entities/Comment';
import { AbstractEntity } from './db/entities/AbstractEntity';
export { User, Post, FriendRequest, Comment, AbstractEntity };
export declare const entities: (typeof Comment | typeof Post | typeof User | typeof FriendRequest)[];
