import { ObjectType } from 'type-graphql';
import { User } from '../../../entities/User';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetFriendsOutput extends PaginatedResponse(User) {}
