import app from 'application';
import { convertEmptyToNull } from 'http/middleware/convert-empty-to-null';
import { json } from 'body-parser';
import { morgan } from 'http/middleware/morgan';
import { trimStrings } from 'http/middleware/trim-strings';

const middleware = [json(), convertEmptyToNull(), trimStrings(), morgan()];

middleware.forEach((middleware) => app.use(middleware));
