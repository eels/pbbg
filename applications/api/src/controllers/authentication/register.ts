import BadDataError from '@pbbg/http/exceptions/bad-data';
import { Controller } from '@pbbg/http/types/http';
import { ValidateRequestBody } from '@pbbg/http/utilities/validate-body';
import { exceptions } from '@pbbg/http/utilities/response';
import { validateAuthentication } from '@pbbg/validators/authentication';
import type AuthenticationQuery from '@/api/queries/authentication';
import type { Context } from 'hono';
import type { Data } from '@pbbg/http/types/validate';

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
