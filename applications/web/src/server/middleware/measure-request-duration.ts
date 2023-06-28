import type { AsyncHandler } from '@/web/types/http';
import type { Response } from 'express';

export class MeasureRequestDuration {
  public static handle: AsyncHandler = async (_, response, next) => {
    const started = process.hrtime.bigint();

    response.on('finish', this.calculateRequestDurationFactory(response, started));
    next();
  };

  private static calculateRequestDurationFactory = (response: Response, started: bigint) => {
    return () => {
      const finished = process.hrtime.bigint();
      const milliseconds = Number(finished - started) / 1000000;

      response.duration = milliseconds;
    };
  };
}
