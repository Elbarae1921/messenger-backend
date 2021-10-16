import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
    @Field()
    @IsNotEmpty({ message: 'Content is required' })
    content: string;

    @Field()
    @IsBoolean()
    isPrivate: boolean;
}
