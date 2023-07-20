import AuthenticationGuard from '@/web/server/middleware/authentication-guard';
import AuthenticationQuery from '@/web/server/queries/authentication';
import CustomResponseProperties from '@/web/server/middleware/custom-response-properties';
import ErrorHandler from '@/web/server/controllers/error';
import MeasureRequestDuration from '@/web/server/middleware/measure-request-duration';
import NotFound from '@/web/server/controllers/not-found';
import RateLimited from '@/web/server/controllers/rate-limited';
import SendAnalyticsEvent from '@/web/server/middleware/send-analytics-event';
import Version from '@/web/server/controllers/version';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { backendDatabaseInstance, databaseInstance } from '@/web/server/utilities/database';
import { queryInstance } from '@/web/server/utilities/query';

interface Controllers {
  ErrorHandler: ErrorHandler;
  NotFound: NotFound;
  RateLimited: RateLimited;
  Version: Version;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
  CustomResponseProperties: CustomResponseProperties;
  MeasureRequestDuration: MeasureRequestDuration;
  SendAnalyticsEvent: SendAnalyticsEvent;
}

interface Queries {
  AuthenticationQuery: AuthenticationQuery;
}

interface Container extends Controllers, Middleware, Queries {
  //
}

export const container = createContainer<Container>({ injectionMode: InjectionMode.CLASSIC });
export const cradle = container.cradle;

// --- Database ---------------------------------

container.register('authentication', asValue(databaseInstance()));
container.register('database', asValue(backendDatabaseInstance()));
container.register('query', asValue(queryInstance()));

// --- Controllers ------------------------------

container.register('ErrorHandler', asClass(ErrorHandler));
container.register('NotFound', asClass(NotFound));
container.register('RateLimited', asClass(RateLimited));
container.register('Version', asClass(Version));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('CustomResponseProperties', asClass(CustomResponseProperties));
container.register('MeasureRequestDuration', asClass(MeasureRequestDuration));
container.register('SendAnalyticsEvent', asClass(SendAnalyticsEvent));

// --- Queries ----------------------------------

container.register('AuthenticationQuery', asClass(AuthenticationQuery));
