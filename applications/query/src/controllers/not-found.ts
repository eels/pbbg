import { Controller } from '@pbbg/http/lib/types/http';
import type { Request, Response } from 'express';

export default class NotFound extends Controller {
  public async handle(_: Request, response: Response) {
    response.respond({
      code: 404,
      message: 'not found',
      status: 'FAIL',
    });
  }
}
