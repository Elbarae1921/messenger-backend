import { User } from '../../../entities/User';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { LoginInput } from '../inputs/LoginInput';
import { compare } from 'bcrypt';
import { IContext } from '../../../types/Context';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';

@Resolver()
export class LoginResolver {
    @Mutation(() => User, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() { req }: IContext
    ): Promise<User | null> {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return null;
        }

        if (!(await compare(password, user.password))) {
            return null;
        }

        req.session.userId = user.id;

        return user;
    }
}
