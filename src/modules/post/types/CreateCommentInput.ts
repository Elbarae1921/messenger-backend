import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IdInput } from '../../../types/IdInput';

@InputType()
export class CreateCommentInput extends IdInput {
    @Field()
    @IsNotEmpty({ message: 'Content is required' })
    content: string;
}
