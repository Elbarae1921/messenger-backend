import { MiddlewareFn } from 'type-graphql';
import { IContext } from '../types/Context';

export const LogAccess: MiddlewareFn<IContext> = ({ context, info }, next) => {
    if (process.env.NODE_ENV === 'test') return next();
    const username: string = context?.user?.fullName(context?.user) || 'guest';
    console.log(`Logging access: ${username} -> ${info.parentType.name}.${info.fieldName}`);
    return next();
};
