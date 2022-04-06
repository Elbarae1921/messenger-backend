import { Request } from 'express';

import { User } from '@messenger/common';
import { IJwtPayload } from './JwtPayload';

export interface IContext {
    req: Request;
    jwtPayload: IJwtPayload;
    user: User;
}
