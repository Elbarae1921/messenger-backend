import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { User } from '@messenger/common';
import { IContext } from '../../../types/Context';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';

@Resolver()
export class MeResolver {
    @Authorized()
    @Query(() => User, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    me(@Ctx() { jwtPayload }: IContext): Promise<User | null> {
        if (!jwtPayload.userId) {
            return null;
        }
        return User.findOne(jwtPayload.userId);
    }
}
