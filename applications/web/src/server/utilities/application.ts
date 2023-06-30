import express from 'express';
import { cradle } from '@/web/server/container';
import { wrapHandler } from '@/web/server/utilities/wrap';

export const app = express();

app.disable('x-powered-by');
app.use(wrapHandler(cradle.CustomResponseProperties.handle));
