import { IsEmail } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { PasswordInput } from './PasswordInput';

@InputType()
export class LoginInput extends PasswordInput {
    @Field()
    @IsEmail()
    email: string;
}
