import { Request, Response } from 'express';

import { User } from '@messenger/common';
import { Session, SessionData } from 'express-session';

export interface IContext {
    req: Request & {
        session: Session & Partial<SessionData> & { userId: number };
        user: User;
    };
    res: Response;
}
