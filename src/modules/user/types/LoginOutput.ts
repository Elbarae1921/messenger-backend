import { ObjectType, Field } from 'type-graphql';
import { User } from '../../../entities/User';

@ObjectType()
export class LoginOutput {
    @Field(() => User)
    user: User;

    @Field()
    jwt: string;
}
