import app from 'application';
import { json } from 'body-parser';
import { trimStrings } from 'http/middleware/trim-strings';

const middleware = [json(), trimStrings()];

middleware.forEach((middleware) => app.use(middleware));
