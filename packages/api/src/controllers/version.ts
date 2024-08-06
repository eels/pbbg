import { Controller } from '@pbbg/http/types/http';
import type { Context } from 'hono';

export default class Version extends Controller {
  public async handle(context: Context) {
    return context.send({
      message: '1.0.0',
      status: 'SUCCESS',
    });
  }
}
