import { Controller } from '@/http/types/http';
import type { Context } from 'hono';

export default class NotFoundHandler extends Controller {
  public static async handle(context: Context) {
    return context.send({
      code: 404,
      message: 'not found',
      status: 'FAIL',
    });
  }
}
