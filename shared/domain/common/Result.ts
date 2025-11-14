/**
 * Result type for functional error handling
 * Represents either success with a value or failure with an error
 */

export type Result<T, E = Error> = Success<T> | Failure<E>;

export class Success<T> {
  readonly isSuccess = true;
  readonly isFailure = false;

  constructor(public readonly value: T) {}

  static of<T>(value: T): Success<T> {
    return new Success(value);
  }
}

export class Failure<E = Error> {
  readonly isSuccess = false;
  readonly isFailure = true;

  constructor(public readonly error: E) {}

  static of<E = Error>(error: E): Failure<E> {
    return new Failure(error);
  }
}

/**
 * Helper functions for Result type
 */
export const Result = {
  ok<T>(value: T): Result<T> {
    return new Success(value);
  },

  fail<E = Error>(error: E): Result<never, E> {
    return new Failure(error);
  },

  isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
    return result.isSuccess;
  },

  isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
    return result.isFailure;
  }
};
