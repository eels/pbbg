import { sanitiseStringValues } from 'utilities/sanitise-string-values';
import type { NextFunction, Request, Response } from 'types/http';

export function sanitiseRequestBody() {
  return async function (request: Request, _: Response, next: NextFunction) {
    if (request.body) {
      request.body = sanitiseStringValues(request.body);
    }

    return next();
  };
}
