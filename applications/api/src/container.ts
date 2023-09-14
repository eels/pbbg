import AuthenticationGuard from '@/api/middleware/authentication-guard';
import AuthenticationQuery from '@/api/queries/authentication';
import CustomResponseProperties from '@/api/middleware/custom-response-properties';
import ErrorHandler from '@/api/controllers/error';
import MeasureRequestDuration from '@/api/middleware/measure-request-duration';
import NotFound from '@/api/controllers/not-found';
import RateLimited from '@/api/controllers/rate-limited';
import Registration from '@/api/controllers/authentication/register';
import SendAnalyticsEvent from '@/api/middleware/send-analytics-event';
import Version from '@/api/controllers/version';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { backendDatabaseInstance, databaseInstance } from '@/api/utilities/database';
import { queryInstance } from '@/api/utilities/query';

interface Controllers {
  ErrorHandler: ErrorHandler;
  NotFound: NotFound;
  RateLimited: RateLimited;
  Registration: Registration;
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
container.register('Registration', asClass(Registration));
container.register('Version', asClass(Version));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('CustomResponseProperties', asClass(CustomResponseProperties));
container.register('MeasureRequestDuration', asClass(MeasureRequestDuration));
container.register('SendAnalyticsEvent', asClass(SendAnalyticsEvent));

// --- Queries ----------------------------------

container.register('AuthenticationQuery', asClass(AuthenticationQuery));
