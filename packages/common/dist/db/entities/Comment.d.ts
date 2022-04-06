import { AbstractEntity } from './AbstractEntity';
import { Post } from './Post';
import { User } from './User';
export declare class Comment extends AbstractEntity {
    constructor(content: string, post: Post, user: User);
    content: string;
    post: Post;
    user: User;
}
