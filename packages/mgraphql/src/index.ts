import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import cors from 'cors';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';
import passport from 'passport';

import { createSchema } from './utils/createSchema';
import { createConnection } from './utils/createConnection';

const main = async () => {
    await createConnection();

    const app = Express();

    const schema = await createSchema();

    const redisStore = connectRedis(session);
    const redisClient = new Redis(Number(process.env.REDIS_PORT), String(process.env.REDIS_HOST));
    redisClient.on('error', error => {
        console.error(error.message);
    });
    redisClient.on('connect', function () {
        console.log(`Redis connected at ${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`);
    });

    const corsOptions: cors.CorsOptions = {
        credentials: true,
        origin:
            process.env.NODE_ENV === 'production'
                ? process.env.FRONTEND_URL
                : (origin, callback) => {
                      callback(null, origin);
                  }
    };
    app.use(cors(corsOptions));

    app.use(
        session({
            name: 'sid',
            secret: String(process.env.SESSION_SECRET),
            store: new redisStore({ client: redisClient, disableTouch: true }),
            proxy: process.env.NODE_ENV === 'production',
            cookie: {
                secure: process.env.NODE_ENV === 'production',
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years,
                sameSite: 'lax'
            },
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        introspection: true
    });

    await server.start();

    server.applyMiddleware({ app, path: '/api', cors: false });

    const PORT = process.env.PORT || 4000;

    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

main();
