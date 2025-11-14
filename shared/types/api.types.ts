/**
 * API type definitions for HTTP requests/responses
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  metadata?: ResponseMetadata;
}

/**
 * API error format
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string; // Only in development
}

/**
 * Response metadata
 */
export interface ResponseMetadata {
  timestamp: string;
  duration?: number;
  requestId?: string;
}

/**
 * Pagination query parameters
 */
export interface PaginationQuery {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  metadata?: Partial<ResponseMetadata>
): ApiResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata
    }
  };
}

/**
 * Create error response
 */
export function createErrorResponse(
  code: string,
  message: string,
  details?: Record<string, any>
): ApiResponse {
  return {
    success: false,
    error: {
      code,
      message,
      details
    },
    metadata: {
      timestamp: new Date().toISOString()
    }
  };
}
