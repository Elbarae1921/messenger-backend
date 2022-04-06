import { createConnection as typeormCreateConnection } from 'typeorm';
import { entities } from '@messenger/common';

export const createConnection = async () => {
    return await typeormCreateConnection({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: entities,
        synchronize: false,
        logging: process.env.NODE_ENV === 'production' ? false : true
    });
};
