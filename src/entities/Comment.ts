import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity('comments')
export class Comment extends AbstractEntity {
    constructor(content: string, post: Post, user: User) {
        super();
        this.content = content;
        this.post = post;
        this.user = user;
    }

    @Field()
    @Column()
    content: string;

    @Field(() => Post)
    @ManyToOne(() => Post, post => post.comments)
    post: Post;

    @Field(() => User)
    @ManyToOne(() => User, { eager: true })
    user: User;
}
