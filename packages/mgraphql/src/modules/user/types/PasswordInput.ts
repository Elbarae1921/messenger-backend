import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PasswordInput {
    @Field()
    @IsNotEmpty()
    password: string;
}
