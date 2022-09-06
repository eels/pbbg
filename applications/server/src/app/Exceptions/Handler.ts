import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import Logger from '@ioc:Adonis/Core/Logger';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger);
  }

  public async handle(error: Error, ctx: HttpContextContract) {
    ctx.response.respond('ERROR', { message: error.message });
  }
}
