/**
 * Either monad - represents a value that can be one of two types
 * Commonly used for Left = Error, Right = Success
 */

export type Either<L, R> = Left<L> | Right<R>;

export class Left<L> {
  readonly isLeft = true;
  readonly isRight = false;

  constructor(public readonly value: L) {}

  static of<L>(value: L): Left<L> {
    return new Left(value);
  }
}

export class Right<R> {
  readonly isLeft = false;
  readonly isRight = true;

  constructor(public readonly value: R) {}

  static of<R>(value: R): Right<R> {
    return new Right(value);
  }
}

/**
 * Helper functions for Either type
 */
export const Either = {
  left<L>(value: L): Either<L, never> {
    return new Left(value);
  },

  right<R>(value: R): Either<never, R> {
    return new Right(value);
  },

  isLeft<L, R>(either: Either<L, R>): either is Left<L> {
    return either.isLeft;
  },

  isRight<L, R>(either: Either<L, R>): either is Right<R> {
    return either.isRight;
  },

  map<L, R, R2>(
    either: Either<L, R>,
    fn: (value: R) => R2
  ): Either<L, R2> {
    return either.isRight ? Either.right(fn(either.value)) : either;
  }
};
