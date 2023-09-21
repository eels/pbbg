import CustomResponseProperties from '@/http/middleware/custom-response-properties';
import ErrorHandler from '@/http/controllers/error';
import NotFoundHandler from '@/http/controllers/not-found';
import { Hono } from '@/http/utilities/application';

export const app = new Hono();

app.use('*', CustomResponseProperties.handle);

app.on404(NotFoundHandler.handle);
app.onErr(ErrorHandler.handle);
