import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';

import { redisClient } from './redis';
import { createSchema } from './utils/createSchema';

const main = async () => {
    await createConnection();

    const app = Express();

    const schema = await createSchema();

    const RedisStore = connectRedis(session);

    app.use(
        cors({
            credentials: true,
            origin: String(process.env.FRONTEND_URL)
        })
    );

    app.use(
        session({
            name: 'sid',
            secret: String(process.env.SESSION_SECRET),
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            }),
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
                sameSite: 'lax'
            },
            resave: false,
            saveUninitialized: false
        })
    );

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await server.start();

    server.applyMiddleware({ app, path: '/api' });

    const PORT = process.env.PORT || 4000;

    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

main();
