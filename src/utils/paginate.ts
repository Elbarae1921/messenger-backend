import { SelectQueryBuilder } from 'typeorm';
import { PaginationInput } from '../types/PaginationInput';
import { IPaginatedResponse } from '../types/PaginatedResponse';

export const paginate = async <T>(
    query: SelectQueryBuilder<T>,
    options: PaginationInput & { key: string }
): Promise<IPaginatedResponse<T>> => {
    const { limit, cursor, key } = options;
    const results = await query
        .where(`${key} > :cursor`, {
            cursor
        })
        .take(limit)
        .getMany();
    const hasMore = results.length >= limit;
    console.log(results);
    return {
        results,
        hasMore
    };
};

export const formatPagination = <T>(
    results: T[],
    options: Pick<PaginationInput, 'limit'>
): IPaginatedResponse<T> => {
    const { limit } = options;
    const hasMore = results.length >= limit;
    return {
        results,
        hasMore
    };
};
