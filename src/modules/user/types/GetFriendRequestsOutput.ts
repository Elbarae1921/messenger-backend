import { ObjectType } from 'type-graphql';
import { FriendRequest } from '../../../entities/FriendRequest';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetFriendRequestsOutput extends PaginatedResponse(FriendRequest) {}
