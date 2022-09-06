import { Limiter } from '@adonisjs/limiter/build/services';

export const { httpLimiters } = Limiter.define('global', () => {
  return Limiter.allowRequests(60)
    .every('1 min')
    .limitExceeded((error) => {
      error.message = 'rate limit exceeded';
      error.status = 429;
    });
});
