import { createResponseObject } from 'utilities/create-response-object';
import { getStatusCode } from 'utilities/get-status-code';
import type { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  constructor(protected app: ApplicationContract) {
    this.app = app;
  }

  public register() {
    //
  }

  public async boot() {
    const Response = this.app.container.use('Adonis/Core/Response');

    Response.macro('respond', function (status, response) {
      const statusCode = getStatusCode(status);
      const responseObject = createResponseObject(status, response);

      this.ctx!.response.status(statusCode).send(responseObject);

      return this;
    });
  }

  public async ready() {
    //
  }

  public async shutdown() {
    //
  }
}
