import type { Request, Response } from 'types/http';

export async function ApplicationEntrypointHandler(_: Request, response: Response) {
  response.buildHttpResponse('SUCCESS');
}
