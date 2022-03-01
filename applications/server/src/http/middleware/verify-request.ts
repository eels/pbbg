import { setRequestToken, verifyRequestToken } from 'support/traits/api/request-token';
import type { NextFunction, Request, Response } from 'types/http';

export function verifyRequest() {
  return async function (request: Request, response: Response, next: NextFunction) {
    const methods = ['POST', 'PUT', 'DELETE', 'PATCH'];
    const isValidApiMethod = methods.includes(request.method);
    const isValidApiRequest = request.path.includes('/');

    if (isValidApiMethod && isValidApiRequest) {
      if (!verifyRequestToken(request)) {
        return response.buildHttpResponse('FORBIDDEN', { message: 'invalid request token' });
      }
    }

    setRequestToken(response);

    return next();
  };
}
