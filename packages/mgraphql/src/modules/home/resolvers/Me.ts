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
    me(@Ctx() { req }: IContext): User | null {
        if (!req.session.userId) {
            return null;
        }
        return req.user;
    }
}
