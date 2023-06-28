import type { AsyncHandler } from '@/web/types/http';

export class RateLimited {
  public static handle: AsyncHandler = async (_, response) => {
    response.respond({
      code: 429,
      message: 'request limit exceeded',
      status: 'FAIL',
    });
  };
}
