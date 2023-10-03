import sqlite from 'sqlite3';
import { open } from 'sqlite';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { resolve } from 'node:path';
import type { Database } from 'sqlite';

export interface Query {
  isDatabaseOpen: () => boolean;
  open: () => Promise<Database>;
}

const { OPEN_READONLY, cached } = sqlite;
let localDatabase: Database;

export function localDatabaseInstance() {
  return {
    isDatabaseOpen: () => {
      return typeof localDatabase !== 'undefined';
    },
    open: async () => {
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
    },
  };
}
