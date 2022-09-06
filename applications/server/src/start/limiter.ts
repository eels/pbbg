import { Limiter } from '@adonisjs/limiter/build/services';

export const { httpLimiters } = Limiter.define('global', () => {
  let limiterInstance = Limiter.allowRequests(60).every('1 min');

  limiterInstance = limiterInstance.limitExceeded((error) => {
    error.message = 'rate limit exceeded';
    error.status = 429;
  });

  return limiterInstance;
});
