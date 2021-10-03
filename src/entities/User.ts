import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcrypt';
import { AbstractEntity } from './AsbtractEntity';
import { Field, ObjectType, Root } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends AbstractEntity {
    constructor(firstName: string, lastName: string, email: string, password: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
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

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.BCRYPT_ROUNDS) || 12);
    }
}
