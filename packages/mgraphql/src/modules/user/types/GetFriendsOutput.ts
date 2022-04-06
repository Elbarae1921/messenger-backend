import { ObjectType } from 'type-graphql';
import { User } from '@messenger/common';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetFriendsOutput extends PaginatedResponse(User) {}
