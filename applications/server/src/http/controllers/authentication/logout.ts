import { deleteAuthenticationTokens } from 'support/traits/auth/token';
import type { Request, Response } from 'types/http';

export async function LogoutHandler(_: Request, response: Response) {
  await deleteAuthenticationTokens(response);

  response.buildHttpResponse('SUCCESS');
}
