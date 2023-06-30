import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import timestring from 'timestring';
import { app } from '@/web/server/utilities/application';
import { cradle } from '@/web/server/container';
import { router } from '@/web/server/utilities/router';
import { wrapHandler } from '@/web/server/utilities/wrap';
import type { Options as RateLimitOptions } from 'express-rate-limit';

const rateLimitOptions: Partial<RateLimitOptions> = {
  handler: cradle.RateLimited.handle,
  legacyHeaders: true,
  max: 1,
  skip: () => process.env.API_RATE_LIMIT_ENABLED !== 'true',
  standardHeaders: true,
  windowMs: timestring('15 minutes', 'ms'),
};

app.use(helmet());
app.use(rateLimiter(rateLimitOptions));
app.use(wrapHandler(cradle.MeasureRequestDuration.handle));
app.use(wrapHandler(cradle.SendAnalyticsEvent.handle));

router.get('/api/version', cradle.Version);

app.use(cradle.ErrorHandler.handle);
app.use(wrapHandler(cradle.NotFound.handle));

export default app;