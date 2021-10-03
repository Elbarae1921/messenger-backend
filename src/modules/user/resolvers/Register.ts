import { User } from '../../../entities/User';
import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { RegisterInput } from '../inputs/RegisterInput';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';

@Resolver()
export class RegisterResolver {
    @Mutation(() => User)
    @UseMiddleware(LogAccess, ResolveTime)
    async register(
        @Arg('data') { email, firstName, lastName, password }: RegisterInput
    ): Promise<User> {
        const user = new User(firstName, lastName, email, password);

        return await user.save();
    }
}
