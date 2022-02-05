import app from 'application';
import cookie from 'cookie-parser';
import { convertEmptyToNull } from 'http/middleware/convert-empty-to-null';
import { csrf } from 'http/middleware/csrf';
import { json } from 'body-parser';
import { morgan } from 'http/middleware/morgan';
import { response } from 'http/middleware/response';
import { trimStrings } from 'http/middleware/trim-strings';
import type { Application } from 'express';

const middleware = [
  response(),
  morgan(),
  json(),
  cookie(),
  csrf(),
  convertEmptyToNull(),
  trimStrings(),
];

middleware.forEach((middleware) => app.use(middleware as Application));
