import { Controller } from '@/http/types/http';
import type { Context } from 'hono';
import type { Exception } from '@/http/types/exception';

export default class ErrorHandler extends Controller {
  public static async handle(error: Exception, context: Context) {
    return context.send({
      code: error.code,
      message: error.message,
      status: 'ERROR',
    });
  }
}
