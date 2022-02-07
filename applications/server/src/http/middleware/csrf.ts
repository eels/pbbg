import { setCSRFToken, verifyCSRFToken } from 'support/traits/api/csrf';
import type { NextFunction, Request, Response } from 'types/http';

export function csrf() {
  return function (request: Request, response: Response, next: NextFunction) {
    const methods = ['POST', 'PUT', 'DELETE', 'PATCH'];
    const isValidApiMethod = methods.includes(request.method);
    const isValidApiRequest = request.path.includes('/');

    if (isValidApiMethod && isValidApiRequest) {
      if (!verifyCSRFToken(request)) {
        return response.buildHttpResponse('FORBIDDEN', { message: 'invalid csrf token' });
      }
    }

    setCSRFToken(response);

    return next();
  };
}
