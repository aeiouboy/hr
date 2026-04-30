export declare class PaginationQueryDto {
    page: number;
    limit: number;
    sort?: string;
    order: 'asc' | 'desc';
}
export interface PaginatedResult<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export declare function paginate<T>(items: T[], total: number, query: PaginationQueryDto): PaginatedResult<T>;
//# sourceMappingURL=pagination.dto.d.ts.map