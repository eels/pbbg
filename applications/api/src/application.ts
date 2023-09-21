import RateLimit from '@pbbg/http/lib/middleware/rate-limit';
import { app } from '@pbbg/http/lib/application';
import { cradle } from '@/api/container';
import { limiter } from '@/api/utilities/limiter';

export default app;

// --- MIDDLEWARE -------------------------------

app.use('*', RateLimit.handle(limiter));
app.use(cradle.MeasureRequestDuration.handle);
app.use(cradle.SendAnalyticsEvent.handle);

// --- GET --------------------------------------

app.get('/api/version', cradle.Version.handle);

// --- POST -------------------------------------

app.post('/api/user/register', cradle.Registration.handle);
