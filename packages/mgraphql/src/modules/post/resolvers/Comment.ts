import { Arg, Authorized, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Comment } from '@messenger/common';
import { Post } from '@messenger/common';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';
import { CreateCommentInput } from '../types/CreateCommentInput';

@Resolver()
export class CommentResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Comment)
    async createComment(
        @Arg('data') { content, id }: CreateCommentInput,
        @Ctx() { req: { user } }: IContext
    ): Promise<Comment> {
        const post = await Post.findOne(id);
        if (!post) {
            throw new Error('Post not found');
        }
        const comment = new Comment(content, post, user);
        await comment.save();
        await comment.reload();
        return comment;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async deleteComment(
        @Arg('data') { id }: IdInput,
        @Ctx() { req: { user } }: IContext
    ): Promise<boolean> {
        const comment = await Comment.findOne(id);
        if (!comment) {
            throw new Error('Comment not found');
        }
        if (comment.user.id !== user.id) {
            throw new Error('You are not allowed to delete this comment');
        }
        await comment.remove();
        return true;
    }
}
