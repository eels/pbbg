import { Controller } from '@/web/types/http';
import type { Request, Response } from 'express';

export default class Version extends Controller {
  public async handle(_: Request, response: Response) {
    response.respond({
      data: {
        version: 'v1.0.0',
      },
      status: 'SUCCESS',
    });
  }
}
