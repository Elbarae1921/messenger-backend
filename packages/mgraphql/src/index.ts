import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import Express from 'express';
import { createConnection } from './utils/createConnection';
import jwt from 'express-jwt';
import cors from 'cors';

import { createSchema } from './utils/createSchema';

const main = async () => {
    const connection = await createConnection();

    console.log(connection.options);

    const app = Express();

    const schema = await createSchema();

    app.use(cors());

    app.use(
        jwt({
            secret: String(process.env.JWT_SECRET) || 'secret',
            credentialsRequired: false,
            algorithms: ['HS256']
        })
    );

    const server = new ApolloServer({
        schema,
        context: ({ req }) => ({ req, jwtPayload: req.user }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
        introspection: true
    });

    await server.start();

    server.applyMiddleware({ app, path: '/api' });

    const PORT = process.env.PORT || 4000;

    app.listen({ port: PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    );
};

main();
