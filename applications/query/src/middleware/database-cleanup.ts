import { Controller } from '@pbbg/http/lib/types/http';
import { noTryAsync } from 'no-try';
import type { Database } from 'sqlite';
import type { NextFunction, Request, Response } from 'express';

export default class DatabaseCleanup extends Controller {
  private database: Promise<Database>;

  public constructor(database: Promise<Database>) {
    super();
    this.database = database;
    this.close = this.close.bind(this);
    this.handle = this.handle.bind(this);
  }

  public async handle(_: Request, response: Response, next: NextFunction) {
    const db = await this.database;

    response.on('close', this.close(db));
    next();
  }

  private close(db: Database) {
    return () => {
      noTryAsync(() => db.close());
    };
  }
}
