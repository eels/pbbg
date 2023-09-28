import { OPEN_READONLY, cached } from 'sqlite3';
import { open } from 'sqlite';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { resolve } from 'node:path';
import type { Database } from 'sqlite';

export type Query = () => Promise<Database>;

let localDatabase: Database;

export function localDatabaseInstance() {
  return async () => {
    const { APP_API_LOCAL_DATABASE_LOCATION } = process.env;

    if (!APP_API_LOCAL_DATABASE_LOCATION) {
      throw new Error('database location not defined');
    }

    if (localDatabase) {
      return localDatabase;
    }

    const [error, db] = await pleaseTryAsync(() => {
      return open({
        driver: cached.Database,
        filename: resolve(APP_API_LOCAL_DATABASE_LOCATION),
        mode: OPEN_READONLY,
      });
    });

    if (error) {
      throw new Error('error fetching database');
    }

    localDatabase = db;

    return localDatabase;
  };
}
