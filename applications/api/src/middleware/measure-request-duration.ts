import { Controller } from '@pbbg/http/lib/types/http';
import type { NextFunction, Request, Response } from 'express';

export default class MeasureRequestDuration extends Controller {
  public constructor() {
    super();
    this.handle = this.handle.bind(this);
  }

  public async handle(_: Request, response: Response, next: NextFunction) {
    const started = process.hrtime.bigint();

    response.on('finish', this.calculateRequestDurationFactory(response, started));
    next();
  }

  private calculateRequestDurationFactory(response: Response, started: bigint) {
    return () => {
      const finished = process.hrtime.bigint();
      const milliseconds = Number(finished - started) / 1000000;

      response.duration = milliseconds;
    };
  }
}
