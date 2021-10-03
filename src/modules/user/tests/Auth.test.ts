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

const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

const registerMutation = `
mutation Register($data: RegisterInput!) {
    register(
        data: $data
    ) {
        user {
            id
            firstName
            lastName
            fullName
            email
        }
        jwt
    }
}
`;

describe('Register', () => {
    it('creates a user', async () => {
        const response = await gqlCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        });
        expect(response).toMatchObject({
            data: {
                register: {
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: `${user.firstName} ${user.lastName}`,
                        email: user.email
                    },
                    jwt: expect.any(String)
                }
            }
        });

        const dbUser = await con.manager.findOne(User, { where: { email: user.email } });
        expect(dbUser).toBeDefined();
    });
});

const loginMutation = `
mutation Login($data: LoginInput!) {
    login(
        data: $data
    ) {
        user {
            id
            firstName
            lastName
            fullName
            email
        }
        jwt
    }
}
`;

describe('Login', () => {
    it('logs in a user', async () => {
        const loginResponse = await gqlCall({
            source: loginMutation,
            variableValues: {
                data: {
                    email: user.email,
                    password: user.password
                }
            }
        });

        expect(loginResponse).toMatchObject({
            data: {
                login: {
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: `${user.firstName} ${user.lastName}`,
                        email: user.email
                    },
                    jwt: expect.any(String)
                }
            }
        });
    });
});
