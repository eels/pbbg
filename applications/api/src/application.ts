import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import timestring from 'timestring';
import { app, router } from '@/api/utilities/application';
import { cradle } from '@/api/container';
import { wrapHandler } from '@pbbg/http/lib/utilities/wrap';
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

// --- GET --------------------------------------

router.get('/api/version', cradle.Version.handle);

// --- POST -------------------------------------

router.post('/api/user/register', cradle.Registration.handle);

app.use(cradle.ErrorHandler.handle);
app.use(wrapHandler(cradle.NotFound.handle));

export default app;
