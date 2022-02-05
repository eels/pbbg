import { convertEmptyObjectStringValuesToNull } from 'utilities/convert-empty-object-string-values-to-null';
import type { NextFunction, Request, Response } from 'express';

export function convertEmptyToNull() {
  return function (request: Request, _: Response, next: NextFunction) {
    if (request.method !== 'GET') {
      request.body = convertEmptyObjectStringValuesToNull(request.body);
    }

    return next();
  };
}
