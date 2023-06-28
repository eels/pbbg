import express from 'express';
import { CustomResponseProperties } from '@/web/server/middleware/custom-response-properties';

export const app = express();

app.disable('x-powered-by');
app.use(CustomResponseProperties.handle);
