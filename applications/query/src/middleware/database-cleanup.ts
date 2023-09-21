import { Controller } from '@pbbg/http/lib/types/http';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context, Next } from 'hono';
import type { Database } from 'sqlite';

export default class DatabaseCleanup extends Controller {
  private database: Promise<Database>;

  public constructor(database: Promise<Database>) {
    super();
    this.database = database;
    this.close = this.close.bind(this);
    this.handle = this.handle.bind(this);
  }

  public async handle(_: Context, next: Next) {
    const db = await this.database;

    await next();
    this.close(db);
  }

  private close(db: Database) {
    return () => {
      pleaseTryAsync(() => db.close());
    };
  }
}
