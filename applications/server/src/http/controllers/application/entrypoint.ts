import type { Request, Response } from 'types/http';

export function ApplicationEntrypointHandler(_: Request, response: Response) {
  return response.buildHttpResponse('SUCCESS');
}
