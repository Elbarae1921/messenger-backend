import { GraphQLSchema } from 'graphql';
import { buildSchema } from 'type-graphql';
import { AuthenticationChecker } from '../helpers/AuthChecker';
import { MeResolver } from '../modules/home/resolvers/Me';
import { CommentResolver } from '../modules/post/resolvers/Comment';
import { LikeResolver } from '../modules/post/resolvers/Like';
import { PostResolver } from '../modules/post/resolvers/Post';
import { AuthResolver } from '../modules/user/resolvers/Auth';
import { FriendResolver } from '../modules/user/resolvers/Friend';
import { UserResolver } from '../modules/user/resolvers/User';

export const createSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
            // does not work for the moment being, so we're importing Resolvers manually
            // __dirname +
            //     `../../modules/*/resolvers/*.${process.env.NODE_ENV === 'production' ? 'js' : 'ts'}`
            FriendResolver,
            MeResolver,
            AuthResolver,
            LikeResolver,
            PostResolver,
            UserResolver,
            CommentResolver
        ],
        authChecker: AuthenticationChecker
    });
};
