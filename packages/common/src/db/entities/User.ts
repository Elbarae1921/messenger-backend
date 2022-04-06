import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { AbstractEntity } from './AbstractEntity';
import { Field, ObjectType, Root } from 'type-graphql';
import { Post } from './Post';
import { FriendRequest } from './FriendRequest';

@ObjectType()
@Entity('users')
export class User extends AbstractEntity {
    constructor(firstName: string, lastName: string, email: string, password: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.image = `${process.env.DICEBEAR_URL}${Date.now()}${this.firstName}${
            this.lastName
        }.svg`;
    }

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    fullName(@Root() parent: User): string {
        return parent.firstName + ' ' + parent.lastName;
    }

    @Field({ nullable: true })
    @Column({ nullable: true })
    image: string;

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];

    @ManyToMany(() => Post, post => post.likers)
    likedPosts: Post[];

    @OneToMany(() => FriendRequest, friendRequest => friendRequest.receiver)
    friendRequestsReceived: Promise<FriendRequest[]>;

    @OneToMany(() => FriendRequest, friendRequest => friendRequest.sender)
    friendRequestsSent: Promise<FriendRequest[]>;

    @ManyToMany(() => User, user => user.friends, { lazy: true })
    @JoinTable()
    friends: Promise<User[]>;

    async acceptFriendRequest(friendRequest: FriendRequest, sender: User): Promise<void> {
        (await this.friends).push(friendRequest.sender);
        (await sender.friends).push(this);

        await friendRequest.remove();

        await sender.save();
        await this.save();
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.BCRYPT_ROUNDS) || 12);
    }
}
