import { ObjectType } from 'type-graphql';
import { Post } from '@messenger/common';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetPostsOutput extends PaginatedResponse(Post) {}
