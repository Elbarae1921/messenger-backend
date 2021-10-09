import { IsBoolean, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreatePostInput {
    @Field()
    @IsNotEmpty({ message: 'Content is required' })
    content: string;

    @Field()
    @IsBoolean()
    isPrivate: boolean;

    @Field({ nullable: true })
    @IsOptional()
    @IsUrl({}, { message: 'Invalid image url' })
    image?: string | null;
}
