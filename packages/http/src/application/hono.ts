import CSRFHandler from '@/http/controllers/csrf';
import CustomResponseProperties from '@/http/middleware/custom-response-properties';
import ErrorHandler from '@/http/controllers/error';
import NotFoundHandler from '@/http/controllers/not-found';
import { Hono } from 'hono';

export const app = new Hono();

app.use('*', CustomResponseProperties.handle);

app.get('/api/int/csrf', CSRFHandler.handle().init);
app.get('/api/get/csrf', CSRFHandler.handle().csrf);

app.onError(ErrorHandler.handle);
app.notFound(NotFoundHandler.handle);
