import { Connection } from 'typeorm';
import faker from 'faker';

import { gqlCall } from '../../../utils/gqlCall';
import { testCon } from '../../../utils/testCon';
import { User } from '../../../entities/User';

let con: Connection;

beforeAll(async () => {
    con = await testCon();
});

afterAll(async () => {
    await con.close();
});

const meQuery = `
query Me {
    me {
        id
        firstName
        lastName
        fullName
        email
    }
}
`;

describe('Me', () => {
    it('gets user', async () => {
        const userData = {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const user = await con.manager.create(User, userData).save();

        const response = await gqlCall({
            source: meQuery,
            userId: user.id
        });
        expect(response).toMatchObject({
            data: {
                me: {
                    id: user.id.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email
                }
            }
        });
    });

    it('return null', async () => {
        const response = await gqlCall({
            source: meQuery
        });
        expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
});
