import { Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import { In, LessThan } from 'typeorm';
import { Post } from '@messenger/common';
import { LogAccess, ResolveTime } from '../../../middlewares';
import { IContext } from '../../../types/Context';
import { IdInput } from '../../../types/IdInput';
import { PaginationInput } from '../../../types/PaginationInput';
import { formatPagination } from '../../../utils/paginate';
import { GetPostsOutput } from '../types/GetPostsOutput';
import { CreatePostInput } from '../types/CreatePostInput';

@Resolver()
export class PostResolver {
    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => GetPostsOutput)
    async getPosts(
        @Arg('data') { limit, cursor }: PaginationInput,
        @Ctx() { user }: IContext
    ): Promise<GetPostsOutput> {
        const friends = await user.friends;
        const where = [
            {
                isPrivate: false
            },
            {
                isPrivate: true,
                user: In(friends.map(friend => friend.id))
            }
        ];
        if (cursor) where.map(x => ({ ...x, id: LessThan(cursor) }));
        const results = await Post.find({
            where,
            order: {
                createdAt: 'DESC'
            },
            take: limit
        });
        return formatPagination(results, { limit });
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Query(() => Post, { nullable: true })
    getPost(@Arg('data') { id }: IdInput): Promise<Post | null> {
        return Post.findOne(id);
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Post)
    async createPost(
        @Arg('data') { content, isPrivate }: CreatePostInput,
        @Ctx() { user }: IContext
    ): Promise<Post> {
        const post = new Post(content, user, isPrivate);
        await post.save();
        await post.reload();
        return post;
    }

    @Authorized()
    @UseMiddleware(LogAccess, ResolveTime)
    @Mutation(() => Boolean)
    async deletePost(@Arg('data') { id }: IdInput, @Ctx() { user }: IContext): Promise<boolean> {
        const post = await Post.findOne(id);
        if (!post) {
            throw new Error('Post not found');
        }
        if (post.user.id !== user.id) {
            throw new Error('You are not allowed to delete this post');
        }
        await post.remove();
        return true;
    }
}
