import type { AsyncHandler } from '@/http/types/http';

export function wrapHandler(fn: AsyncHandler) {
  return (...args: Parameters<AsyncHandler>) => {
    return fn(...args).catch(args[args.length - 1] as (reason: unknown) => PromiseLike<never>);
  };
}
