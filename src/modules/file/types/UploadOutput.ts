import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class UploadOutput {
    @Field()
    filename: string;

    @Field()
    mimetype: string;
}
