/**
 * Common type definitions used across the application
 */

/**
 * Unique identifier type
 */
export type ID = string;

/**
 * Timestamp type
 */
export type Timestamp = Date;

/**
 * Generic key-value map
 */
export type Dictionary<T = any> = Record<string, T>;

/**
 * Nullable type
 */
export type Nullable<T> = T | null;

/**
 * Optional type
 */
export type Optional<T> = T | undefined;

/**
 * Paginated response
 */
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Sort direction
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Sort options
 */
export interface SortOptions {
  field: string;
  direction: SortDirection;
}

/**
 * Filter operator
 */
export type FilterOperator = 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';

/**
 * Filter definition
 */
export interface Filter {
  field: string;
  operator: FilterOperator;
  value: any;
}
