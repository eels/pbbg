import { setCSRFToken, verifyCSRFToken } from 'utilities/csrf';
import type { NextFunction, Request, Response } from 'express';

export function csrf() {
  return function (request: Request, response: Response, next: NextFunction) {
    if (request.method === 'GET') {
      setCSRFToken(response);
    }

    const methods = ['POST', 'PUT', 'DELETE', 'PATCH'];
    const isValidApiMethod = methods.includes(request.method);
    const isValidApiRequest = request.path.includes('/');

    if (isValidApiMethod && isValidApiRequest) {
      if (!verifyCSRFToken(request)) {
        return response.status(500).json({ message: 'invalid csrf token' });
      }
    }

    return next();
  };
}
