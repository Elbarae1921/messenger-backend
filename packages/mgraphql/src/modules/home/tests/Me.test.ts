import { getConnection } from 'typeorm';
import faker from 'faker';

import { gqlCall } from '../../../utils/gqlCall';
import { User } from '@messenger/common';

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

export const MeTest = () => {
    it('should get user', async () => {
        const con = getConnection();

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

    it('should return null', async () => {
        const response = await gqlCall({
            source: meQuery
        });
        expect(response).toMatchObject({
            data: {
                me: null
            }
        });
    });
};
