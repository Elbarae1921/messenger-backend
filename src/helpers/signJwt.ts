import { sign } from 'jsonwebtoken';

export const signJwt = (userId: number) => {
    return sign({ userId }, String(process.env.JWT_SECRET) || 'secret', { algorithm: 'HS256' });
};
