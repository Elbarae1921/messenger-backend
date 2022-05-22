import { User } from '@messenger/common';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { LoginInput } from '../types/LoginInput';
import { compare } from 'bcrypt';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { LoginOutput } from '../types/LoginOutput';
import { RegisterInput } from '../types/RegisterInput';
import { IContext } from '../../../types/Context';

@Resolver()
export class AuthResolver {
    @Mutation(() => LoginOutput, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    async login(
        @Arg('data') { email, password }: LoginInput,
        @Ctx() { req }: IContext
    ): Promise<LoginOutput | null> {
        console.log(email, password);
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

        return { user };
    }

    @Mutation(() => LoginOutput)
    @UseMiddleware(LogAccess, ResolveTime)
    async register(
        @Arg('data') { email, firstName, lastName, password }: RegisterInput,
        @Ctx() { req }: IContext
    ): Promise<LoginOutput> {
        const user = new User(firstName, lastName, email, password);

        await user.save();

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(LogAccess, ResolveTime)
    logout(@Ctx() { req, res }: IContext): Promise<boolean> {
        return new Promise(resolve =>
            req.session.destroy(err => {
                if (err) {
                    console.log(err);
                    return false;
                }
                res.clearCookie('sid');
                return resolve(true);
            })
        );
    }
}
