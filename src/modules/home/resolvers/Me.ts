import { Authorized, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql';

import { User } from '../../../entities/User';
import { IContext } from '../../../types/Context';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';

@Resolver()
export class MeResolver {
    @Authorized()
    @Query(() => User, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    async me(@Ctx() { req }: IContext): Promise<User | null> {
        if (!req.session.userId) {
            return null;
        }
        return User.findOne(req.session.userId);
    }
}
