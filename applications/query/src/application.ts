import { app } from '@pbbg/http/lib/application';
import { cradle } from '@/query/container';

export default app;

// --- POST -------------------------------------

app.post('/api/query', cradle.AuthenticationGuard.handle, cradle.Query.handle);
