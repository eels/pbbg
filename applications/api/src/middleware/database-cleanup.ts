import { Controller } from '@pbbg/http/lib/types/http';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context, Next } from 'hono';
import type { Query } from '@/api/utilities/database-local';

export default class DatabaseCleanup extends Controller {
  private query: Query;

  public constructor(query: Query) {
    super();
    this.query = query;
    this.handle = this.handle.bind(this);
  }

  public async handle(_: Context, next: Next) {
    await next();

    if (this.query.isDatabaseOpen()) {
      await pleaseTryAsync(async () => (await this.query.open()).close());
    }
  }
}
