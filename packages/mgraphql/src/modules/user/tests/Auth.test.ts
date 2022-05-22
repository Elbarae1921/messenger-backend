import { getConnection } from 'typeorm';
import faker from 'faker';

import { gqlCall } from '../../../utils/gqlCall';
import { User } from '@messenger/common';

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
    }
}
`;

export const RegisterTest = () => {
    it('should create a user', async () => {
        const con = getConnection();

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
                    }
                }
            }
        });

        const dbUser = await con.manager.findOne(User, { where: { email: user.email } });
        expect(dbUser).toBeDefined();
    });
};

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
    }
}
`;

export const LoginTest = () => {
    it('should log in a user', async () => {
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
                    }
                }
            }
        });
    });
};
