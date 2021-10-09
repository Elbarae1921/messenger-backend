import { Arg, Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Like } from 'typeorm';
import { User } from '../../../entities/User';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';
import { SearchUsersInput } from '../types/SearchUsersInput';

@Resolver()
export class UserResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => User, { nullable: true })
    async getUser(@Arg('data') { id }: IdInput, @Ctx() { user }: IContext): Promise<User | null> {
        if (user.id === id) {
            return user;
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
    async searchUsers(@Arg('data') { term }: SearchUsersInput): Promise<User[]> {
        return User.find({
            where: [{ lastName: Like(`%${term}%`) }, { firstName: Like(`%${term}%`) }]
        });
    }
}
