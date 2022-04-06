import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { IsEmailUnique } from '../../../helpers/isEmailUnique';
import { PasswordInput } from './PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 255)
    firstName: string;

    @Field()
    @Length(1, 255)
    lastName: string;

    @Field()
    @IsEmail()
    @IsEmailUnique({ message: 'Email already in use' })
    email: string;
}
