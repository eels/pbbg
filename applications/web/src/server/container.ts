import AuthenticationGuard from '@/web/server/middleware/authentication-guard';
import CustomResponseProperties from '@/web/server/middleware/custom-response-properties';
import ErrorHandler from '@/web/server/controllers/error';
import MeasureRequestDuration from '@/web/server/middleware/measure-request-duration';
import NotFound from '@/web/server/controllers/not-found';
import RateLimited from '@/web/server/controllers/rate-limited';
import SendAnalyticsEvent from '@/web/server/middleware/send-analytics-event';
import Version from '@/web/server/controllers/version';
import { InjectionMode, asClass, createContainer } from 'awilix';

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

interface Container extends Controllers, Middleware {
  //
}

export const container = createContainer<Container>({ injectionMode: InjectionMode.CLASSIC });
export const cradle = container.cradle;

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
