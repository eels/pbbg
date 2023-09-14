import 'dotenv/config';
import helmet from 'helmet';
import { app, router } from '@/query/utilities/application';
import { cradle } from '@/query/container';
import { wrapHandler } from '@pbbg/http/lib/utilities/wrap';

const PORT = process.env.APP_QUERY_PORT ?? 8091;

app.use(helmet());
app.use(wrapHandler(cradle.DatabaseCleanup.handle));

router.post('/api/query', cradle.AuthenticationGuard.handle, cradle.Query.handle);

app.use(cradle.ErrorHandler.handle);
app.use(wrapHandler(cradle.NotFound.handle));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
