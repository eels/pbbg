import { trimObjectStringValues } from 'utilities/trim-object-string-values';
import type { NextFunction, Request, Response } from 'express';

export function trimStrings() {
  return function (request: Request, _: Response, next: NextFunction) {
    if (request.method !== 'GET') {
      request.body = trimObjectStringValues(request.body);
    }

    return next();
  };
}
