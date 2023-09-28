import type { Authentication, Database } from '@/api/utilities/database';
import type { Query } from '@/api/utilities/database-local';

export default class BaseQuery {
  protected authentication: Authentication;
  protected database: Database;
  protected query: Query;

  public constructor(authentication: Authentication, database: Database, query: Query) {
    this.authentication = authentication;
    this.database = database;
    this.query = query;
  }
}
