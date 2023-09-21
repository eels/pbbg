import { Controller } from '@pbbg/http/lib/types/http';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context } from 'hono';
import type { Database } from 'sqlite';

export default class Query extends Controller {
  private database: Promise<Database>;

  public constructor(database: Promise<Database>) {
    super();
    this.database = database;
    this.handle = this.handle.bind(this);
  }

  public async handle(context: Context) {
    const { mode = 'SINGULAR', query, variables = [] } = await context.req.json();

    if (!query) {
      throw new Error('sql query not supplied');
    }

    const db = await this.database;
    const statement = await db.prepare(query);

    if (variables.length !== 0) {
      await statement.bind(variables);
    }

    const fetchMethod = mode === 'SINGULAR' ? 'get' : 'all';
    const [error, results] = await pleaseTryAsync(() => statement[fetchMethod]());

    if (error) {
      throw new Error('error querying database');
    }

    return context.send({
      data: results,
      status: 'SUCCESS',
    });
  }
}
