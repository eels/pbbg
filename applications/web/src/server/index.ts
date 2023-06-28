import * as controllers from '@/web/server/controllers';
import * as middleware from '@/web/server/middleware';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import timestring from 'timestring';
import { app } from '@/web/server/utilities/application';
import { router } from '@/web/server/utilities/router';
import { wrapHandler } from '@/web/server/utilities/wrap';
import type { Options as RateLimitOptions } from 'express-rate-limit';

const rateLimitOptions: Partial<RateLimitOptions> = {
  handler: controllers.RateLimited.handle,
  legacyHeaders: true,
  max: 1,
  skip: () => process.env.RATE_LIMIT_API_ENABLED !== 'true',
  standardHeaders: true,
  windowMs: timestring('15 minutes', 'ms'),
};

app.use(helmet());
app.use(rateLimiter(rateLimitOptions));
app.use(wrapHandler(middleware.MeasureRequestDuration.handle));
app.use(wrapHandler(middleware.SendAnalyticsEvent.handle));

router.get('/api/version', controllers.Version.handle);

app.use(controllers.ErrorHandler.handle);
app.use(wrapHandler(controllers.NotFound.handle));

export default app;
