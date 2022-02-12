import { setAuthenticationTokens } from 'support/traits/auth/token';
import type { Request, Response } from 'types/http';

export async function LoginHandler(_: Request, response: Response) {
  await setAuthenticationTokens(response, { name: 'liam' });

  response.buildHttpResponse('SUCCESS');
}
