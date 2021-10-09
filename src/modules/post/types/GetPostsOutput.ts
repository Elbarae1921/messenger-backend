import { ObjectType } from 'type-graphql';
import { Post } from '../../../entities/Post';
import { PaginatedResponse } from '../../../types/PaginatedResponse';

@ObjectType()
export class GetPostsOutput extends PaginatedResponse(Post) {}
