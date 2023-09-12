export type BaseResult<T, E> = [E | null, T | null];
export type Result<T, E> = [E, null] | [null, T];
export type AsyncResult<T, E> = Promise<Result<T, E>>;

export type Handler<T> = () => T;
export type AsyncHandler<T> = () => Promise<T>;

export function pleaseTry<T, E = Error>(fn: Handler<T>): Result<T, E> {
  const result: BaseResult<T, E> = [null, null];

  try {
    result[1] = fn();
  } catch (error) {
    result[0] = error as any as E;
  }

  return result as Result<T, E>;
}

export async function pleaseTryAsync<T, E = Error>(fn: AsyncHandler<T>): AsyncResult<T, E> {
  const result: BaseResult<T, E> = [null, null];

  try {
    result[1] = await fn();
  } catch (error) {
    result[0] = error as any as E;
  }

  return result as Result<T, E>;
}
