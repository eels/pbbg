import app from 'application';
import cookie from 'cookie-parser';
import { Handlers } from '@sentry/node';
import { convertEmptyToNull } from 'http/middleware/convert-empty-to-null';
import { csrf } from 'http/middleware/csrf';
import { error } from 'http/middleware/error';
import { json } from 'body-parser';
import { morgan } from 'http/middleware/morgan';
import { response } from 'http/middleware/response';
import { trimStrings } from 'http/middleware/trim-strings';
import type { RequestHandler } from 'express';

const { errorHandler, requestHandler } = Handlers;

const preController = [
  requestHandler(),
  response(),
  morgan(),
  json(),
  cookie(process.env.APP_COOKIE_SECRET),
  csrf(),
  convertEmptyToNull(),
  trimStrings(),
];

const postController = [errorHandler(), error()];

type Stack = 'pre-controller' | 'post-controller';

export function registerMiddlewareStack(stack: Stack) {
  const middleware = stack === 'pre-controller' ? preController : postController;

  middleware.forEach((middleware) => app.use(middleware as RequestHandler));
}
