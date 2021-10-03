import { User } from '../../../entities/User';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { RegisterInput } from '../types/RegisterInput';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';
import { signJwt } from '../../../helpers/signJwt';
import { LoginOutput } from '../types/LoginOutput';

@Resolver()
export class RegisterResolver {
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
