import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Query } from '@/api/utilities/database-local';

export interface QueryParameters {
  mode?: 'SINGULAR' | 'MULTIPLE';
  query: string;
  variables?: string[];
}

export default class SQLiteQuery {
  private query: Query;

  public constructor(query: Query) {
    this.query = query;
  }

  public async fetch({ mode = 'SINGULAR', query, variables = [] }: QueryParameters) {
    if (!query) {
      throw new Error('sql query not supplied');
    }

    const db = await this.query.open();
    const [errorStatement, statement] = await pleaseTryAsync(() => db.prepare(query));

    if (errorStatement) {
      throw new Error('error querying database');
    }

    if (variables.length !== 0) {
      await statement.bind(variables);
    }

    const fetchMethod = mode === 'SINGULAR' ? 'get' : 'all';
    const [error, results] = await pleaseTryAsync(() => statement[fetchMethod]());

    if (error) {
      throw new Error('error querying database');
    }

    return results;
  }
}
