import { deleteAuthenticationTokens } from 'support/traits/auth/token';
import type { Request, Response } from 'types/http';

export function LogoutHandler(_: Request, response: Response) {
  deleteAuthenticationTokens(response);

  response.buildHttpResponse('SUCCESS');
}
