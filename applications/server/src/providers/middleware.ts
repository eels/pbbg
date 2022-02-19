import app from 'application/http';
import cookie from 'cookie-parser';
import limiter from 'express-rate-limit';
import { Handlers } from '@sentry/node';
import { constructHttpResponseObject } from 'support/traits/api/response';
import { convertEmptyToNull } from 'http/middleware/convert-empty-to-null';
import { csrf } from 'http/middleware/csrf';
import { error } from 'http/middleware/error';
import { ignoreFavicon } from 'http/middleware/ignore-favicon';
import { json } from 'body-parser';
import { morgan } from 'http/middleware/morgan';
import { response } from 'http/middleware/response';
import { trimStrings } from 'http/middleware/trim-strings';
import type { RequestHandler } from 'express';

const { errorHandler, requestHandler } = Handlers;

const limiterOptions = {
  max: 60,
  message: constructHttpResponseObject('RATE-LIMITED', { message: 'too many requests' }),
  standardHeaders: true,
  windowMs: 1 * 60 * 1000,
};

const prepControllerMiddleware = [
  requestHandler(),
  response(),
  morgan(),
  json(),
  cookie(process.env.APP_SECRET_COOKIE_TOKEN),
  limiter(limiterOptions),
  csrf(),
  ignoreFavicon(),
  convertEmptyToNull(),
  trimStrings(),
];

// prettier-ignore
const postControllerMiddleware = [
  errorHandler(),
  error(),
];

export const PREP_STACK = Symbol.for('PREP');

export const POST_STACK = Symbol.for('POST');

type Stack = typeof PREP_STACK | typeof POST_STACK;

export function getMiddlewareStack(stack: Stack) {
  switch (stack) {
    case POST_STACK:
      return postControllerMiddleware;
    case PREP_STACK:
      return prepControllerMiddleware;
    default:
      throw new Error('Valid middleware stack not provided');
  }
}

export function registerMiddlewareStack(stack: Stack) {
  getMiddlewareStack(stack).forEach((middleware) => app.use(middleware as RequestHandler));
}
