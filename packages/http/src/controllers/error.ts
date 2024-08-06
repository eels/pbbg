import { Controller } from '@/http/types/http';
import type { Context } from 'hono';
import type { HTTPResponseError } from 'hono/types';

export default class ErrorHandler extends Controller {
  public static async handle(error: Error | HTTPResponseError, context: Context) {
    return context.send({
      code: 'code' in error ? error.code as number : 500,
      message: error.message.toUpperCase().trim(),
      status: 'ERROR',
    });
  }
}
