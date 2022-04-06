import faker from 'faker';
import { getConnection } from 'typeorm';
import { User } from '@messenger/common';
import { gqlCall } from '../../../utils/gqlCall';

const getUserQuery = `
    query GetUser($data: IdInput!) {
        getUser(data: $data) {
            id
            firstName
            lastName
            fullName
            email
            friend
        }
    }
`;

const searchUsersQuery = `
    query SearchUsers($data: SearchUsersInput!) {
        searchUsers(data: $data) {
            id
            firstName
            lastName
            fullName
            email
            friend
        }
    }
`;

const user = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: undefined
};

export const GetAndSearchUserTest = () => {
    it('should get user', async () => {
        const con = getConnection();

        // create a user
        const { id } = await con.manager.connection.manager.create(User, user).save();
        user.id = id;

        const response = await gqlCall({
            source: getUserQuery,
            variableValues: {
                data: {
                    id: user.id
                }
            },
            userId: 1
        });
        expect(response).toMatchObject({
            data: {
                getUser: {
                    id: user.id.toString(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    fullName: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    friend: false
                }
            }
        });
    });

    it('should search users', async () => {
        const response = await gqlCall({
            source: searchUsersQuery,
            variableValues: {
                data: {
                    term: user.firstName
                }
            },
            userId: 1
        });
        expect(response).toMatchObject({
            data: {
                searchUsers: [
                    {
                        id: user.id.toString(),
                        firstName: user.firstName,
                        lastName: user.lastName,
                        fullName: `${user.firstName} ${user.lastName}`,
                        email: user.email,
                        friend: false
                    }
                ]
            }
        });
    });
};
