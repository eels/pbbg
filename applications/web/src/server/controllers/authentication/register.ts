import BadDataError from '@pbbg/http/lib/exceptions/bad-data';
import { Controller } from '@pbbg/http/lib/types/http';
import { ValidateRequestBody } from '@/web/server/utilities/validate-body';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { validateAuthentication } from '@/web/validators/authentication';
import type AuthenticationQuery from '@/web/server/queries/authentication';
import type { Data } from '@pbbg/http/lib/types/validate';
import type { Request, Response } from 'express';

export default class Registration extends Controller {
  private authentication: AuthenticationQuery;

  public constructor(AuthenticationQuery: AuthenticationQuery) {
    super();
    this.authentication = AuthenticationQuery;
    this.handle = this.handle.bind(this);
  }

  @ValidateRequestBody(validateAuthentication())
  public async handle(request: Request, response: Response) {
    const { email, password } = request.body as Data<typeof validateAuthentication>;

    if (await this.authentication.doesUserExist(email)) {
      throw new BadDataError(exceptions.USER_EXISTS);
    }

    await this.authentication.createUser(email, password);

    return response.respond({
      data: {},
      status: 'SUCCESS',
    });
  }
}
