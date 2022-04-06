import { AbstractEntity } from './AbstractEntity';
import { User } from './User';
import { Comment } from './Comment';
export declare class Post extends AbstractEntity {
    constructor(content: string, user: User, isPrivate: boolean);
    content: string;
    isPrivate: boolean;
    user: User;
    likers: User[];
    comments: Comment[];
    likes(parent: Post): number;
    addLike(user: User): void;
    removeLike(user: User): void;
}
