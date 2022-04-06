import { AbstractEntity } from './AbstractEntity';
import { Post } from './Post';
import { FriendRequest } from './FriendRequest';
export declare class User extends AbstractEntity {
    constructor(firstName: string, lastName: string, email: string, password: string);
    firstName: string;
    lastName: string;
    fullName(parent: User): string;
    image: string;
    email: string;
    password: string;
    posts: Post[];
    likedPosts: Post[];
    friendRequestsReceived: Promise<FriendRequest[]>;
    friendRequestsSent: Promise<FriendRequest[]>;
    friends: Promise<User[]>;
    acceptFriendRequest(friendRequest: FriendRequest, sender: User): Promise<void>;
    hashPassword(): Promise<void>;
}
