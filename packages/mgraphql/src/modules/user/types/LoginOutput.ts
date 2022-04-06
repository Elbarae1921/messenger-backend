import { ObjectType, Field } from 'type-graphql';
import { User } from '@messenger/common';

@ObjectType()
export class LoginOutput {
    @Field(() => User)
    user: User;

    @Field()
    jwt: string;
}
