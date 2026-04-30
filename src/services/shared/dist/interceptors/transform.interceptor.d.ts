import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface ApiResponse<T> {
    data: T;
    meta?: Record<string, unknown>;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>>;
}
//# sourceMappingURL=transform.interceptor.d.ts.map