import BadDataError from '@pbbg/http/lib/exceptions/bad-data';
import { Controller } from '@pbbg/http/lib/types/http';
import { ValidateRequestBody } from '@pbbg/http/lib/utilities/validate-body';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { validateAuthentication } from '@pbbg/validators/lib/authentication';
import type AuthenticationQuery from '@/api/queries/authentication';
import type { Context } from 'hono';
import type { Data } from '@pbbg/http/lib/types/validate';

export default class Registration extends Controller {
  private authentication: AuthenticationQuery;

  public constructor(AuthenticationQuery: AuthenticationQuery) {
    super();
    this.authentication = AuthenticationQuery;
    this.handle = this.handle.bind(this);
  }

  @ValidateRequestBody(validateAuthentication())
  public async handle(context: Context) {
    const { email, password } = (await context.req.json()) as Data<typeof validateAuthentication>;

    if (await this.authentication.doesUserExist(email)) {
      throw new BadDataError(exceptions.USER_EXISTS);
    }

    await this.authentication.createUser(email, password);

    return context.send({
      data: {},
      status: 'SUCCESS',
    });
  }
}
