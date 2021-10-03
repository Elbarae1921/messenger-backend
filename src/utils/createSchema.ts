import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { AuthenticationChecker } from '../helpers/AuthChecker';

export const createSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
            __dirname +
                `../../modules/*/resolvers/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
        ],
        authChecker: AuthenticationChecker
    });
};
