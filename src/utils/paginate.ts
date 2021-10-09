// import { SelectQueryBuilder } from 'typeorm';
import { PaginationInput } from '../types/PaginationInput';
import { IPaginatedResponse } from '../types/PaginatedResponse';
import { AbstractEntity } from '../entities/AbstractEntity';

// export const paginate = async <T>(
//     query: SelectQueryBuilder<T>,
//     options: PaginationInput & { key: string }
// ): Promise<IPaginatedResponse<T>> => {
//     const { limit, cursor, key } = options;
//     const results = await query
//         .where(`${key} > :cursor`, {
//             cursor
//         })
//         .take(limit)
//         .getMany();
//     const hasMore = results.length >= limit;
//     const lastId = hasMore ? results[results.length - 1].id : null;
//     console.log(results);
//     return {
//         results,
//         hasMore
//     };
// };

export const formatPagination = <T extends AbstractEntity>(
    results: T[],
    { limit }: Pick<PaginationInput, 'limit'>
): IPaginatedResponse<T> => {
    const hasMore = results.length >= limit;
    const lastId = results.length ? results[results.length - 1].id : null;
    return {
        results,
        hasMore,
        lastId
    };
};
