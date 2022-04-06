import { ObjectType } from 'type-graphql';
import { FriendRequest } from '@messenger/common';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetFriendRequestsOutput extends PaginatedResponse(FriendRequest) {}
