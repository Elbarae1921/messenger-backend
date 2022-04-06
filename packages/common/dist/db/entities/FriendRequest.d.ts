import { AbstractEntity } from './AbstractEntity';
import { User } from './User';
export declare class FriendRequest extends AbstractEntity {
    constructor(sender: User, receiver: User);
    receiver: User;
    sender: User;
}
