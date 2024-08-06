import AuthenticationGuard from '@/api/middleware/authentication-guard';
import CSRFTokenGuard from '@pbbg/http/middleware/csrf';
import MeasureRequestDuration from '@pbbg/http/middleware/measure-request-duration';
import RateLimit from '@pbbg/http/middleware/rate-limit';
import SendAnalyticsEvent from '@pbbg/http/middleware/send-analytics-event';
import Version from '@/api/controllers/version';
import { InjectionMode, asClass, createContainer } from 'awilix';

interface Controllers {
  Version: Version;
}

interface Middleware {
  AuthenticationGuard: AuthenticationGuard;
  CSRFTokenGuard: CSRFTokenGuard;
  MeasureRequestDuration: MeasureRequestDuration;
  RateLimit: RateLimit;
  SendAnalyticsEvent: SendAnalyticsEvent;
}

interface Container extends Controllers, Middleware {
  //
}

export const container = createContainer<Container>({ injectionMode: InjectionMode.CLASSIC });
export const cradle = container.cradle;

// --- Controllers ------------------------------

container.register('Version', asClass(Version));

// --- Middleware -------------------------------

container.register('AuthenticationGuard', asClass(AuthenticationGuard));
container.register('CSRFTokenGuard', asClass(CSRFTokenGuard));
container.register('MeasureRequestDuration', asClass(MeasureRequestDuration));
container.register('RateLimit', asClass(RateLimit));
container.register('SendAnalyticsEvent', asClass(SendAnalyticsEvent));
