import { AuthChecker } from 'type-graphql';
import { User } from '../entities/User';
import { IContext } from '../types/Context';

export const AuthenticationChecker: AuthChecker<IContext> = async ({ context }) => {
    if (!context.req.session.userId) {
        return false;
    }

    const user = await User.findOne(context.req.session.userId);

    if (!user) {
        return false;
    }

    context.user = user;
    return true;
};