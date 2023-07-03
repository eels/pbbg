import AuthenticationGuard from '@/query/middleware/authentication-guard';
import CustomResponseProperties from '@/query/middleware/custom-response-properties';
import DatabaseCleanup from '@/query/middleware/database-cleanup';
import ErrorHandler from '@/query/controllers/error';
import NotFound from '@/query/controllers/not-found';
import Query from '@/query/controllers/query';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { databaseInstance } from '@/query/utilities/database';

interface Controllers {
  ErrorHandler: ErrorHandler;
  NotFound: NotFound;
  Query: Query;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
  CustomResponseProperties: CustomResponseProperties;
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

container.register('ErrorHandler', asClass(ErrorHandler));
container.register('NotFound', asClass(NotFound));
container.register('Query', asClass(Query));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('CustomResponseProperties', asClass(CustomResponseProperties));
container.register('DatabaseCleanup', asClass(DatabaseCleanup));
