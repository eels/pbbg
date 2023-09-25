import timestring from 'timestring';
import { RateLimiterMemory } from 'rate-limiter-flexible';

export const limiter = new RateLimiterMemory({
  duration: timestring('15 minutes', 'ms'),
  points: 100,
});
