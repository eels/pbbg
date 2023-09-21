import AuthenticationGuard from '@/query/middleware/authentication-guard';
import DatabaseCleanup from '@/query/middleware/database-cleanup';
import Query from '@/query/controllers/query';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { databaseInstance } from '@/query/utilities/database';

interface Controllers {
  Query: Query;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
  DatabaseCleanup: DatabaseCleanup;
}

interface Container extends Controllers, Middleware {
  //
}

export const container = createContainer<Container>({ injectionMode: InjectionMode.CLASSIC });
export const cradle = container.cradle;

// --- Database ---------------------------------

container.register('database', asValue(databaseInstance()));

// --- Controllers ------------------------------

container.register('Query', asClass(Query));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('DatabaseCleanup', asClass(DatabaseCleanup));
