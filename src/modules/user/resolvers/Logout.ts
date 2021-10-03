import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { IContext } from '../../../types/Context';
import { LogAccess } from '../../../middlewares/LogAccess';
import { ResolveTime } from '../../../middlewares/ResolveTime';

@Resolver()
export class LogoutResolver {
    @Mutation(() => Boolean, { nullable: true })
    @UseMiddleware(LogAccess, ResolveTime)
    async logout(@Ctx() { req, res }: IContext): Promise<boolean> {
        return new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    console.log(err);
                    return reject(false);
                }
                res.clearCookie('sid');
                resolve(true);
            });
        });
    }
}
