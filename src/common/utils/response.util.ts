

export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface PaginatedResponse<T = any> {
    success: boolean;
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }
}

export const createResponse = <T>(
    data: T,
    message?: string
): ApiResponse<T> => ({
    success: true,
    message,
    data
});

export const createPaginatedResponse = <T>(
    data: T[],
    total: number,
    page: number,
    limit: number
): PaginatedResponse<T> => {
    const totalPages = Math.ceil(total / limit);
    return {
        success: true,
        data,
        meta: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        }
    }
}