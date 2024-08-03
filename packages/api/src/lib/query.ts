import type { Authentication, Database } from '@/api/utilities/database';

export default class BaseQuery {
  protected authentication: Authentication;
  protected database: Database;

  public constructor(authentication: Authentication, database: Database) {
    this.authentication = authentication;
    this.database = database;
  }
}
