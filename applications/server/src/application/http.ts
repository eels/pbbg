import express from 'express';
import { PROXY_QUANTITY } from 'config/constants';

const app = express();

app.set('trust proxy', PROXY_QUANTITY);
app.set('x-powered-by', false);

export default app;
