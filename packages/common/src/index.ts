import { User } from './db/entities/User';
import { Post } from './db/entities/Post';
import { FriendRequest } from './db/entities/FriendRequest';
import { Comment } from './db/entities/Comment';
import { AbstractEntity } from './db/entities/AbstractEntity';

export { User, Post, FriendRequest, Comment, AbstractEntity };

export const entities = [User, Post, FriendRequest, Comment];
