import { AuthChecker } from 'type-graphql';
import { User } from '@messenger/common';
import { IContext } from '../types/Context';

export const AuthenticationChecker: AuthChecker<IContext> = async ({ context }) => {
    if (!context.req.session.userId) {
        return false;
    }

    const user = await User.findOne(context.req.session.userId);

    if (!user) {
        return false;
    }

    context.req.user = user;

    return true;
};
