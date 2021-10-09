import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class SearchUsersInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    term: string;
}
