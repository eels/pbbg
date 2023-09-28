/* eslint-disable import/no-relative-parent-imports */
/* See: https://github.com/pocketbase/js-sdk/issues/34 */

import PocketBase from '../../../../node_modules/pocketbase/dist/pocketbase.cjs.js';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';

export type Authentication = () => PocketBase;
export type Database = () => Promise<PocketBase>;

let authenticationDatabase: PocketBase;
let backendDatabase: PocketBase;

export function authenticationDatabaseInstance() {
  return () => {
    const { POCKETBASE_URL } = process.env;

    if (!POCKETBASE_URL) {
      throw new Error('pocketbase host not configured');
    }

    if (!authenticationDatabase) {
      authenticationDatabase = new PocketBase(POCKETBASE_URL);
    }

    return authenticationDatabase;
  };
}

export function backendDatabaseInstance() {
  return async () => {
    const { POCKETBASE_ADMIN_PASSWORD, POCKETBASE_ADMIN_USERNAME } = process.env;

    if (!POCKETBASE_ADMIN_PASSWORD || !POCKETBASE_ADMIN_USERNAME) {
      throw new Error('pocketbase username and/or password not configured');
    }

    if (backendDatabase?.authStore?.isValid) {
      return backendDatabase;
    }

    if (backendDatabase?.authStore?.isValid === false) {
      const [error] = await pleaseTryAsync(() => backendDatabase.admins.authRefresh());

      if (!error) {
        return backendDatabase;
      }
    }

    const pb = authenticationDatabaseInstance()();

    await pb.admins.authWithPassword(POCKETBASE_ADMIN_USERNAME, POCKETBASE_ADMIN_PASSWORD);
    pb.autoCancellation(false);

    backendDatabase = pb;

    return pb;
  };
}
