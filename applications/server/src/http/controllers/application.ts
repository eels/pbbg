import type { Request, Response } from 'types/http';

export function ApplicationHandler(_: Request, response: Response) {
  response.buildHttpResponse('SUCCESS');
}
