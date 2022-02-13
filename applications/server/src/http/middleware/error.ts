import type { Request, Response } from 'types/http';

export function error() {
  return function (error: Error, _: Request, response: Response) {
    return response.buildHttpResponse('ERROR', { message: error.message });
  };
}
