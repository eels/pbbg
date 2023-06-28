import type { AsyncHandler } from '@/web/types/http';

export class NotFound {
  public static handle: AsyncHandler = async (_, response) => {
    response.respond({
      code: 404,
      message: 'not found',
      status: 'FAIL',
    });
  };
}
