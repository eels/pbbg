import { app } from '@pbbg/http/lib/application';
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
app.get('/api/user/session', cradle.Session.handle);

// --- POST -------------------------------------

app.post('/api/user/register', cradle.Registration.handle);
app.post('/api/user/signin', cradle.SignIn.handle);
app.post('/api/user/signout', cradle.SignOut.handle);
