import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { LessThan } from 'typeorm';
import { FriendRequest } from '../../../entities/FriendRequest';
import { User } from '../../../entities/User';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';
import { IPaginatedResponse } from '../../../types/PaginatedResponse';
import { PaginationInput } from '../../../types/PaginationInput';
import { formatPagination } from '../../../utils/paginate';
import { GetFriendRequestsOutput } from '../types/GetFriendRequestsOutput';
import { GetFriendsOutput } from '../types/GetFriendsOutput';

@Resolver()
export class FriendResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => GetFriendsOutput)
    async getFriends(
        @Arg('data') { cursor, limit }: PaginationInput,
        @Ctx() { user }: IContext
    ): Promise<IPaginatedResponse<User>> {
        const friends = await user.friends;
        if (friends.length) {
            const users = await User.createQueryBuilder('user')
                .where('id IN (:...ids)', { ids: friends.map(f => f.id) })
                .andWhere('id > :cursor', { cursor: cursor || 0 })
                .take(limit)
                .getMany();
            return formatPagination(users, { limit });
        }
        return formatPagination([], { limit });
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => GetFriendRequestsOutput)
    async getFriendRequests(
        @Arg('data') { limit, cursor }: PaginationInput,
        @Ctx() { user }: IContext
    ): Promise<IPaginatedResponse<FriendRequest>> {
        const where = {
            receiver: {
                id: user.id
            }
        };
        if (cursor) {
            where['id'] = LessThan(cursor);
        }
        const friendRequests = await FriendRequest.find({
            where,
            order: {
                createdAt: 'DESC'
            },
            take: limit
        });
        return formatPagination(friendRequests, { limit });
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async sendFriendRequest(
        @Arg('data') { id }: IdInput,
        @Ctx() { user }: IContext
    ): Promise<boolean> {
        const friend = await User.findOne(id);
        if (!friend) {
            throw new Error('Friend not found');
        }

        const existingRequests = await FriendRequest.find({
            where: {
                sender: {
                    id: user.id
                },
                receiver: {
                    id: friend.id
                }
            }
        });
        if (existingRequests.length) {
            return true;
        }

        const request = new FriendRequest(user, friend);

        await request.save();

        return true;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async acceptFriendRequest(
        @Arg('data') { id }: IdInput,
        @Ctx() { user }: IContext
    ): Promise<boolean> {
        const request = await FriendRequest.findOne(id);
        if (!request || request.receiver.id !== user.id) {
            throw new Error('Friend request not found');
        }
        const sender = await User.findOne(request.sender.id);
        if (!sender) {
            throw new Error('Sender not found');
        }

        await user.acceptFriendRequest(request, sender);

        return true;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async cancelOrDeclineFriendRequest(
        @Arg('data') { id }: IdInput,
        @Ctx() { user }: IContext
    ): Promise<boolean> {
        const request = await FriendRequest.findOne(id);
        if (!request || (request.receiver.id !== user.id && request.sender.id !== user.id)) {
            throw new Error('Friend request not found');
        }

        await request.remove();

        return true;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async removeFriend(@Arg('data') { id }: IdInput, @Ctx() { user }: IContext): Promise<boolean> {
        const friend = await User.findOne(id);
        if (!friend) {
            throw new Error('Friend not found');
        }

        user.friends = Promise.resolve((await user.friends).filter(f => f.id !== friend.id));
        friend.friends = Promise.resolve((await friend.friends).filter(f => f.id !== user.id));

        await user.save();
        await friend.save();

        return true;
    }
}
