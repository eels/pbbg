import { Controller } from '@/web/types/http';
import type { Request, Response } from 'express';

export default class RateLimited extends Controller {
  public async handle(_: Request, response: Response) {
    response.respond({
      code: 429,
      message: 'request limit exceeded',
      status: 'FAIL',
    });
  }
}
