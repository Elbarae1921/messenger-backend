import { Request } from 'express';

import { User } from '../entities/User';
import { IJwtPayload } from './JwtPayload';

export interface IContext {
    req: Request;
    jwtPayload: IJwtPayload;
    user: User;
}
