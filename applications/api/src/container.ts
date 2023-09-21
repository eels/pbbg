import AuthenticationGuard from '@/api/middleware/authentication-guard';
import AuthenticationQuery from '@/api/queries/authentication';
import MeasureRequestDuration from '@pbbg/http/lib/middleware/measure-request-duration';
import Registration from '@/api/controllers/authentication/register';
import SendAnalyticsEvent from '@pbbg/http/lib/middleware/send-analytics-event';
import Version from '@/api/controllers/version';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { backendDatabaseInstance, databaseInstance } from '@/api/utilities/database';
import { queryInstance } from '@/api/utilities/query';

interface Controllers {
  Registration: Registration;
  Version: Version;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
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

container.register('Registration', asClass(Registration));
container.register('Version', asClass(Version));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('MeasureRequestDuration', asClass(MeasureRequestDuration));
container.register('SendAnalyticsEvent', asClass(SendAnalyticsEvent));

// --- Queries ----------------------------------

container.register('AuthenticationQuery', asClass(AuthenticationQuery));
