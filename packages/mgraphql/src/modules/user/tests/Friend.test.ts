import { gqlCall } from '../../../utils/gqlCall';

const sendFriendRequestMutation = `
    mutation SendFriendRequest($data: IdInput!) {
        sendFriendRequest(data: $data)
    }
`;

const getFriendRequestsQuery = `
    query GetFriendRequests($data: PaginationInput!) {
        getFriendRequests(data: $data) {
            results {
                id
                sender {
                    id
                }
            }
            hasMore
            lastId
        }
    }
`;

const acceptFriendRequestMutation = `
    mutation AcceptFriendRequest($data: IdInput!) {
        acceptFriendRequest(data: $data)
    }
`;

const getFriendsQuery = `
    query GetFriends($data: PaginationInput!) {
        getFriends(data: $data) {
            results {
                id
            }
            hasMore
            lastId
        }
    }
`;

const cancelOrDeclineFriendRequestMutation = `
    mutation CancelOrDeclineFriendRequest($data: IdInput!) {
        cancelOrDeclineFriendRequest(data: $data)
    }
`;

const removeFriendMutation = `
    mutation RemoveFriend($data: IdInput!) {
        removeFriend(data: $data)
    }
`;

export const FriendTest = () => {
    it('should send friend request', async () => {
        const response = await gqlCall({
            source: sendFriendRequestMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 2
        });

        expect(response).toEqual({
            data: {
                sendFriendRequest: true
            }
        });
    });

    it('should get friend requests', async () => {
        const response = await gqlCall({
            source: getFriendRequestsQuery,
            variableValues: {
                data: {}
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                getFriendRequests: {
                    results: [
                        {
                            id: '1',
                            sender: {
                                id: '2'
                            }
                        }
                    ],
                    hasMore: false,
                    lastId: 1
                }
            }
        });
    });

    it('should accept friend request', async () => {
        const response = await gqlCall({
            source: acceptFriendRequestMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                acceptFriendRequest: true
            }
        });
    });

    it('should get friends', async () => {
        const response = await gqlCall({
            source: getFriendsQuery,
            variableValues: {
                data: {}
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                getFriends: {
                    results: [
                        {
                            id: '2'
                        }
                    ],
                    hasMore: false,
                    lastId: 2
                }
            }
        });
    });

    it('should remove friend', async () => {
        const response = await gqlCall({
            source: removeFriendMutation,
            variableValues: {
                data: {
                    id: 2
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                removeFriend: true
            }
        });

        const response2 = await gqlCall({
            source: getFriendsQuery,
            variableValues: {
                data: {}
            },
            userId: 1
        });

        expect(response2).toEqual({
            data: {
                getFriends: {
                    results: [],
                    hasMore: false,
                    lastId: null
                }
            }
        });
    });

    it('should decline friend request', async () => {
        // send a friend request first
        await gqlCall({
            source: sendFriendRequestMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 2
        });

        const response = await gqlCall({
            source: cancelOrDeclineFriendRequestMutation,
            variableValues: {
                data: {
                    id: 2
                }
            },
            userId: 1
        });

        expect(response).toEqual({
            data: {
                cancelOrDeclineFriendRequest: true
            }
        });
    });

    it('should cancel friend request', async () => {
        // send a friend request first
        await gqlCall({
            source: sendFriendRequestMutation,
            variableValues: {
                data: {
                    id: 1
                }
            },
            userId: 2
        });

        const response = await gqlCall({
            source: cancelOrDeclineFriendRequestMutation,
            variableValues: {
                data: {
                    id: 3
                }
            },
            userId: 2
        });

        expect(response).toEqual({
            data: {
                cancelOrDeclineFriendRequest: true
            }
        });
    });
};
