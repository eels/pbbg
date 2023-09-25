import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import InternalError from '@pbbg/http/lib/exceptions/internal';
import { AUTH_COOKIE_NAME } from '@pbbg/http/lib/config/constants';
import { Controller } from '@pbbg/http/lib/types/http';
import { ValidateRequestBody } from '@pbbg/http/lib/utilities/validate-body';
import { encodeJWT } from '@/api/utilities/jwt';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import { setCookie } from '@pbbg/http/lib/utilities/cookie';
import { validateAuthentication } from '@pbbg/validators/lib/authentication';
import type AuthenticationQuery from '@/api/queries/authentication';
import type { AuthResponse } from '@pbbg/database-types/lib/types';
import type { ClientResponseError } from 'pocketbase';
import type { Context } from 'hono';
import type { Data } from '@pbbg/http/lib/types/validate';

export default class SignIn extends Controller {
  private authentication: AuthenticationQuery;

  public constructor(AuthenticationQuery: AuthenticationQuery) {
    super();
    this.authentication = AuthenticationQuery;
    this.handle = this.handle.bind(this);
  }

  @ValidateRequestBody(validateAuthentication())
  public async handle(context: Context) {
    const { email, password } = (await context.req.json()) as Data<typeof validateAuthentication>;

    const [error, user] = await pleaseTryAsync<AuthResponse, ClientResponseError>(() => {
      return this.authentication.authenticate(email, password);
    });

    if (error && error?.status === 400) {
      throw new AuthenticationError(exceptions.INVALID_CREDENTIALS);
    }

    if (error && error?.status !== 400) {
      throw new InternalError(exceptions.INTERNAL_ERROR);
    }

    if (!user) {
      throw new AuthenticationError(exceptions.INVALID_CREDENTIALS);
    }

    await setCookie(context, AUTH_COOKIE_NAME, await encodeJWT({ email: user.record.email }));

    return context.send({
      data: {},
      status: 'SUCCESS',
    });
  }
}
