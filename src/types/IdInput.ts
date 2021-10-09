import { IsNumber, Min } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class IdInput {
    @IsNumber()
    @Min(1)
    @Field()
    id: number;
}
