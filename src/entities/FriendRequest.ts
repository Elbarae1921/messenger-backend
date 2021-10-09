import { Field, ObjectType } from 'type-graphql';
import { Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { User } from './User';

@ObjectType()
@Entity()
export class FriendRequest extends AbstractEntity {
    constructor(sender: User, receiver: User) {
        super();
        this.sender = sender;
        this.receiver = receiver;
    }

    @Field(() => User)
    @ManyToOne(() => User, user => user.friendRequestsReceived, { eager: true })
    receiver: User;

    @Field(() => User)
    @ManyToOne(() => User, user => user.friendRequestsSent, { eager: true })
    sender: User;
}
