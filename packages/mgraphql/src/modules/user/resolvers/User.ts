import {
    Arg,
    Authorized,
    Ctx,
    FieldResolver,
    Query,
    Resolver,
    Root,
    UseMiddleware
} from 'type-graphql';
import { Like } from 'typeorm';
import { FriendRequest } from '@messenger/common';
import { User } from '@messenger/common';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';
import { SearchUsersInput } from '../types/SearchUsersInput';

@Resolver(() => User)
export class UserResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => User, { nullable: true })
    async getUser(@Arg('data') { id }: IdInput, @Ctx() { req }: IContext): Promise<User | null> {
        if (req.session.userId === id) {
            return req.user;
        }
        const otherUser = await User.findOne(id);
        if (!otherUser) {
            throw new Error('User not found');
        }
        return otherUser;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => [User])
    searchUsers(@Arg('data') { term }: SearchUsersInput): Promise<User[]> {
        return User.find({
            where: [{ lastName: Like(`%${term}%`) }, { firstName: Like(`%${term}%`) }]
        });
    }

    @FieldResolver(() => Boolean)
    async inviting(@Root() parent: User, @Ctx() { req: { user } }: IContext): Promise<boolean> {
        // get friend requests sent to the parent, and check if the parent is the sender
        const friendRequestsSent = await FriendRequest.find({
            where: { sender: { id: parent.id } }
        });
        return !!friendRequestsSent.find(x => x.receiver.id === user.id);
    }

    @FieldResolver(() => Boolean)
    async invited(@Root() parent: User, @Ctx() { req: { user } }: IContext): Promise<boolean> {
        // get friend requests sent by the parent, and check if the current user is the receiver
        const friendRequestsReceived = await FriendRequest.find({
            where: { receiver: { id: parent.id } }
        });
        return !!friendRequestsReceived.find(x => x.sender.id === user.id);
    }

    @FieldResolver(() => Boolean)
    async friend(@Root() parent: User, @Ctx() { req: { user } }: IContext): Promise<boolean> {
        return !!(await parent.friends).find(x => x.id === user.id);
    }
}
