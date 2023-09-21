import { Controller } from '@/http/types/http';
import type { Context, Next } from 'hono';

export default class MeasureRequestDuration extends Controller {
  public constructor() {
    super();
    this.handle = this.handle.bind(this);
  }

  public async handle(context: Context, next: Next) {
    const started = process.hrtime.bigint();

    await next();
    this.calculateRequestDurationFactory(context, started);
  }

  private calculateRequestDurationFactory(context: Context, started: bigint) {
    const finished = process.hrtime.bigint();
    const milliseconds = Number(finished - started) / 1000000;

    context.duration = milliseconds;
  }
}
