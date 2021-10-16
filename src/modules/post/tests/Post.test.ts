import { gqlCall } from '../../../utils/gqlCall';

const post = {
    isPrivate: false,
    content: 'Post content'
};

const createPostMutation = `
    mutation CreatePost($data: CreatePostInput!) {
        createPost(
            data: $data
        ) {
            id
            content
            image
            isPrivate
            user {
                id
            }
            likers {
                id
            }
            comments {
                id
            }
            likes
        }
    }
`;

export const CreatePostTest = () => {
    it('should create a post', async () => {
        const response = await gqlCall({
            source: createPostMutation,
            variableValues: {
                data: post
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                createPost: {
                    content: post.content,
                    id: '1',
                    isPrivate: post.isPrivate,
                    image: null,
                    user: {
                        id: '1'
                    },
                    likers: [],
                    comments: [],
                    likes: 0
                }
            }
        });
    });
};

const likePostMutation = `
    mutation LikePost($data: IdInput!) {
        like(data: $data)
    }
`;

const unlikePostMutation = `
    mutation UnLikePost($data: IdInput!) {
        unlike(data: $data)
    }
`;

const commentPostMutation = `
    mutation CommentPost($data: CreateCommentInput!){
        createComment(data: $data) {
            id
            content
            user {
                id
            }
        }
    }
`;

const deleteCommentMutation = `
    mutation DeleteComment($data: IdInput!) {
        deleteComment(data: $data)
    }
`;

const comment = {
    content: 'hello'
};

export const CommentAndLikeTest = () => {
    it('should like a post', async () => {
        const response = await gqlCall({
            source: likePostMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                like: true
            }
        });
    });

    it('should unlike a post', async () => {
        const response = await gqlCall({
            source: unlikePostMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        // add the like back
        await gqlCall({
            source: likePostMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                unlike: true
            }
        });
    });

    it('should comment a post', async () => {
        const response = await gqlCall({
            source: commentPostMutation,
            variableValues: {
                data: {
                    id: 1,
                    content: comment.content
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                createComment: {
                    id: '1',
                    content: comment.content,
                    user: {
                        id: '1'
                    }
                }
            }
        });
    });

    it('should delete a comment', async () => {
        await gqlCall({
            source: commentPostMutation,
            variableValues: {
                data: {
                    id: 1,
                    content: comment.content
                }
            },
            userId: 1
        });

        const response = await gqlCall({
            source: deleteCommentMutation,
            variableValues: {
                data: {
                    id: 2
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                deleteComment: true
            }
        });
    });
};

const getPostQuery = `
    query GetPost($data: IdInput!) {
        getPost(data: $data) {
            id
            content
            image
            isPrivate
            likes
            user {
                id
            }
            likers {
                id
            }
            comments {
                content
                user {
                    id
                }
            }
        }
    }
`;

const getPostsQuery = `
    query GetPosts($data: PaginationInput!){
        getPosts(data: $data) {
            results {
                id
                content
                image
                isPrivate
                user {
                    id
                }
                likers {
                    id
                }
                comments {
                    content
                    user {
                        id
                    }
                }
                likes
            }
            hasMore
            lastId
        }
    }
`;

export const GetPostTest = () => {
    it('should get one post', async () => {
        const response = await gqlCall({
            source: getPostQuery,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                getPost: {
                    id: '1',
                    content: post.content,
                    image: null,
                    isPrivate: post.isPrivate,
                    likes: 1,
                    user: {
                        id: '1'
                    },
                    likers: [
                        {
                            id: '1'
                        }
                    ],
                    comments: [
                        {
                            content: comment.content,
                            user: {
                                id: '1'
                            }
                        }
                    ]
                }
            }
        });
    });

    it('should get multiple posts', async () => {
        const response = await gqlCall({
            source: getPostsQuery,
            variableValues: {
                data: {}
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                getPosts: {
                    hasMore: false,
                    lastId: 1,
                    results: [
                        {
                            id: '1',
                            content: post.content,
                            image: null,
                            isPrivate: post.isPrivate,
                            likes: 1,
                            user: {
                                id: '1'
                            },
                            likers: [
                                {
                                    id: '1'
                                }
                            ],
                            comments: [
                                {
                                    content: comment.content,
                                    user: {
                                        id: '1'
                                    }
                                }
                            ]
                        }
                    ]
                }
            }
        });
    });
};

const deletePostMutation = `
    mutation DeletePost($data: IdInput!) {
        deletePost(data: $data)
    }
`;

export const DeletePostTest = () => {
    it('should delete post', async () => {
        const response = await gqlCall({
            source: deletePostMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                deletePost: true
            }
        });
    });
};
