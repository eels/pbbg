import type { AsyncErrorHandler } from '@/web/types/http';

export class ErrorHandler {
  public static handle: AsyncErrorHandler = async (error, _, response, __) => {
    response.respond({
      message: error.message,
      status: 'ERROR',
    });
  };
}
