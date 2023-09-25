import AuthenticationGuard from '@/api/middleware/authentication-guard';
import AuthenticationQuery from '@/api/queries/authentication';
import CSRFTokenGuard from '@pbbg/http/lib/middleware/csrf';
import MeasureRequestDuration from '@pbbg/http/lib/middleware/measure-request-duration';
import RateLimit from '@pbbg/http/lib/middleware/rate-limit';
import Registration from '@/api/controllers/authentication/register';
import SendAnalyticsEvent from '@pbbg/http/lib/middleware/send-analytics-event';
import Session from '@/api/controllers/authentication/session';
import SignIn from '@/api/controllers/authentication/sign-in';
import SignOut from '@/api/controllers/authentication/sign-out';
import Version from '@/api/controllers/version';
import { InjectionMode, asClass, asValue, createContainer } from 'awilix';
import { backendDatabaseInstance, databaseInstance } from '@/api/utilities/database';
import { queryInstance } from '@/api/utilities/query';

interface Controllers {
  Registration: Registration;
  Session: Session;
  SignIn: SignIn;
  SignOut: SignOut;
  Version: Version;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
  CSRFTokenGuard: CSRFTokenGuard;
  MeasureRequestDuration: MeasureRequestDuration;
  RateLimit: RateLimit;
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
container.register('Session', asClass(Session));
container.register('SignIn', asClass(SignIn));
container.register('SignOut', asClass(SignOut));
container.register('Version', asClass(Version));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('CSRFTokenGuard', asClass(CSRFTokenGuard));
container.register('MeasureRequestDuration', asClass(MeasureRequestDuration));
container.register('RateLimit', asClass(RateLimit));
container.register('SendAnalyticsEvent', asClass(SendAnalyticsEvent));

// --- Queries ----------------------------------

container.register('AuthenticationQuery', asClass(AuthenticationQuery));
