import { buildHttpResponse } from 'support/traits/api/response';
import type { NextFunction, Request, Response } from 'types/http';

export function response() {
  return function (_: Request, response: Response, next: NextFunction) {
    response.buildHttpResponse = buildHttpResponse(response);

    return next();
  };
}
