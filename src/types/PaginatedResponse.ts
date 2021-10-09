import { ClassType, Field, ObjectType } from 'type-graphql';

export interface IPaginatedResponse<T> {
    results: T[];
    hasMore: boolean;
}

export const PaginatedResponse = <T>(TClass: ClassType<T>) => {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResults {
        @Field(() => [TClass])
        results: T[];

        @Field()
        hasMore: boolean;
    }
    return PaginatedResults;
};
