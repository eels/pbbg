import express from 'express';
import { cradle } from '@/query/container';
import { createExpressRouter } from '@pbbg/http/lib/utilities/router';
import { wrapHandler } from '@pbbg/http/lib/utilities/wrap';

export const app = express();
export const router = createExpressRouter(app);

app.disable('x-powered-by');
app.use(express.json());
app.use(wrapHandler(cradle.CustomResponseProperties.handle));
