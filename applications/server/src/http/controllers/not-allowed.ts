import type { Request, Response } from 'types/http';

export function NotAllowedHandler(_: Request, response: Response) {
  response.buildHttpResponse('ERROR', { message: 'method not allowed' });
}
