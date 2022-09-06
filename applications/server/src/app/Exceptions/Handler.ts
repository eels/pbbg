import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';
import { getStatus } from 'utilities/status';
import type { Exception } from 'types/exception';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: Exception, ctx: HttpContextContract) {
    ctx.response.respond(error.status ? getStatus(error.status) : 'ERROR', {
      message: error.message,
    });
  }
}
