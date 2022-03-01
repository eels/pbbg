import type { NextFunction, Request, Response } from 'types/http';

export function ignoreFavicon() {
  return async function (request: Request, response: Response, next: NextFunction) {
    if (request.originalUrl.includes('favicon.ico')) {
      return response.status(204).end();
    }

    return next();
  };
}
