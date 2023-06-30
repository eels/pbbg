import type { AsyncErrorHandler } from '@/web/types/http';

export class ErrorHandler {
  public static handle: AsyncErrorHandler = async (error, _, response, __) => {
    response.respond({
      code: error.code,
      message: error.message,
      status: 'ERROR',
    });
  };
}
