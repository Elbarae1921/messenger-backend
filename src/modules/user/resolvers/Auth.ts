import { User } from '../../../entities/User';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { LoginInput } from '../types/LoginInput';
import { compare } from 'bcrypt';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { signJwt } from '../../../helpers/signJwt';
import { LoginOutput } from '../types/LoginOutput';
import { RegisterInput } from '../types/RegisterInput';

@Resolver()
export class AuthResolver {
    @Mutation(() => LoginOutput, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    async login(@Arg('data') { email, password }: LoginInput): Promise<LoginOutput | null> {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return null;
        }

        if (!(await compare(password, user.password))) {
            return null;
        }

        const jwt = signJwt(user.id);

        return { user, jwt };
    }

    @Mutation(() => LoginOutput)
    @UseMiddleware(LogAccess, ResolveTime)
    async register(
        @Arg('data') { email, firstName, lastName, password }: RegisterInput
    ): Promise<LoginOutput> {
        const user = new User(firstName, lastName, email, password);

        await user.save();

        const jwt = signJwt(user.id);

        return {
            user,
            jwt
        };
    }
}
