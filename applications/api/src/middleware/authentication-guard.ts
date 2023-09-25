import { Controller } from '@pbbg/http/lib/types/http';
import type { Context, Next } from 'hono';

export default class AuthenticationGuard extends Controller {
  public async handle(_: Context, next: Next) {
    await next();
  }
}
