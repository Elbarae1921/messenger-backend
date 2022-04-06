import { Field, ObjectType, Root } from 'type-graphql';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { User } from './User';
import { Comment } from './Comment';

@ObjectType()
@Entity('posts')
export class Post extends AbstractEntity {
    constructor(content: string, user: User, isPrivate: boolean) {
        super();
        this.content = content;
        this.user = user;
        this.isPrivate = isPrivate;
    }

    @Field()
    @Column()
    content: string;

    @Field()
    @Column()
    isPrivate: boolean;

    @Field(() => User)
    @ManyToOne(() => User, user => user.posts, { eager: true })
    user: User;

    @Field(() => [User])
    @ManyToMany(() => User, user => user.likedPosts, { eager: true })
    @JoinTable()
    likers: User[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.post, { eager: true })
    comments: Comment[];

    @Field()
    likes(@Root() parent: Post): number {
        return parent.likers.length;
    }

    addLike(user: User): void {
        if (!this.likers.find(liker => liker.id === user.id)) {
            this.likers.push(user);
        }
    }

    removeLike(user: User): void {
        this.likers = this.likers.filter(liker => liker.id !== user.id);
    }
}
