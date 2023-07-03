import { OPEN_READONLY, cached } from 'sqlite3';
import { noTryAsync } from 'no-try';
import { open } from 'sqlite';
import { resolve } from 'path';
import type { Database } from 'sqlite';

let database: Database;

export async function databaseInstance() {
  if (!process.env.APP_QUERY_DATABASE_LOCATION) {
    throw new Error('database location not defined');
  }

  if (database) {
    return database;
  }

  const [error, db] = await noTryAsync(() => {
    return open({
      driver: cached.Database,
      filename: resolve(process.env.APP_QUERY_DATABASE_LOCATION ?? ''),
      mode: OPEN_READONLY,
    });
  });

  if (error) {
    throw new Error('error fetching database');
  }

  database = db;

  return database;
}
