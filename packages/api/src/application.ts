import { app } from '@pbbg/http/application/hono';
import { cradle } from '@/api/container';
import { limiter } from '@/api/utilities/limiter';

export default app;

// --- MIDDLEWARE -------------------------------

app.use('*', cradle.RateLimit.handle(limiter));
app.use('*', cradle.CSRFTokenGuard.handle);
app.use('*', cradle.MeasureRequestDuration.handle);
app.use('*', cradle.SendAnalyticsEvent.handle);

// --- GET --------------------------------------

app.get('/api/version', cradle.Version.handle);
