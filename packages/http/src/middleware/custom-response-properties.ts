import { Controller } from '@/http/types/http';
import { response } from '@/http/utilities/response';
import type { Context, Next } from 'hono';

export default class CustomResponseProperties extends Controller {
  public static async handle(context: Context, next: Next) {
    context.send = response(context);
    await next();
  }
}
