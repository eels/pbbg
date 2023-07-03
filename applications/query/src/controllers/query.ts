import { Controller } from '@pbbg/http/lib/types/http';
import { noTryAsync } from 'no-try';
import type { Database } from 'sqlite';
import type { Request, Response } from 'express';

export default class Query extends Controller {
  private database: Promise<Database>;

  public constructor(database: Promise<Database>) {
    super();
    this.database = database;
    this.handle = this.handle.bind(this);
  }

  public async handle(request: Request, response: Response) {
    const { mode = 'SINGULAR', query, variables = [] } = request.body;

    if (!query) {
      throw new Error('sql query not supplied');
    }

    const db = await this.database;
    const statement = await db.prepare(query);

    if (variables.length !== 0) {
      await statement.bind(variables);
    }

    const fetchMethod = mode === 'SINGULAR' ? 'get' : 'all';
    const [error, results] = await noTryAsync(() => statement[fetchMethod]());

    if (error) {
      throw new Error('error querying database');
    }

    response.respond({
      data: results,
      status: 'SUCCESS',
    });
  }
}
