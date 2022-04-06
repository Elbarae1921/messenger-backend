import { Arg, Authorized, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Post } from '@messenger/common';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';

@Resolver()
export class LikeResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async like(@Arg('data') { id }: IdInput, @Ctx() { user }: IContext) {
        const post = await Post.findOne(id);
        if (!post) {
            throw new Error('Post not found');
        }
        post.addLike(user);
        await post.save();
        return true;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async unlike(@Arg('data') { id }: IdInput, @Ctx() { user }: IContext) {
        const post = await Post.findOne(id);
        if (!post) {
            throw new Error('Post not found');
        }
        post.removeLike(user);
        await post.save();
        return true;
    }
}
