import { Controller } from '@pbbg/http/lib/types/http';
import type { Context } from 'hono';

export default class Version extends Controller {
  public async handle(context: Context) {
    return context.send({
      data: {
        version: 'v1.0.0',
      },
      status: 'SUCCESS',
    });
  }
}
