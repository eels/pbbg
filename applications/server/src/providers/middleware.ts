import app from 'application';
import { convertEmptyToNull } from 'http/middleware/convert-empty-to-null';
import { json } from 'body-parser';
import { trimStrings } from 'http/middleware/trim-strings';

const middleware = [json(), convertEmptyToNull(), trimStrings()];

middleware.forEach((middleware) => app.use(middleware));
