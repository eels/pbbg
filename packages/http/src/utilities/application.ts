import { Hono as HonoBase } from 'hono';
import type { Context, ErrorHandler as HonoErrorHandler, NotFoundHandler } from 'hono';
import type { Exception } from '@/http/types/exception';

type ErrorHandler = (error: Exception, context: Context) => Response | Promise<Response>;

export class Hono extends HonoBase {
  public on404(handler: NotFoundHandler) {
    return super.notFound(handler);
  }

  public onErr(handler: ErrorHandler) {
    return super.onError(handler as HonoErrorHandler);
  }
}
