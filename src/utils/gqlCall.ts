import { graphql, GraphQLSchema } from 'graphql';

import { createSchema } from './createSchema';

let schema: GraphQLSchema;

interface Props {
    source: string;
    variableValues?: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    userId?: number;
}

export const gqlCall = async ({ source, variableValues, userId }: Props) => {
    if (!schema) {
        schema = await createSchema();
    }
    return graphql({
        schema,
        source,
        variableValues,
        contextValue: {
            req: {
                session: {
                    userId
                }
            },
            res: {
                clearCookie: jest.fn()
            }
        }
    });
};
