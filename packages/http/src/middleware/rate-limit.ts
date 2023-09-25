import RateLimitedError from '@/http/exceptions/rate-limited';
import { Controller } from '@/http/types/http';
import { exceptions } from '@/http/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context, Next } from 'hono';
import type { RateLimiterMemory } from 'rate-limiter-flexible';

export default class RateLimit extends Controller {
  public handle(limiter: RateLimiterMemory) {
    return async (context: Context, next: Next) => {
      const { API_RATE_LIMIT_ENABLED } = process.env;
      const ip = context.req.header('x-forwarded-for');

      if (!ip || API_RATE_LIMIT_ENABLED !== 'true') {
        return await next();
      }

      const [error] = await pleaseTryAsync(() => limiter.consume(ip));

      if (error) {
        throw new RateLimitedError(exceptions.RATE_LIMITED);
      }

      await next();
    };
  }
}
