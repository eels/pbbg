import type limiterConfig from 'Config/limiter';

declare module '@adonisjs/limiter/build/services/index' {
  type Config = typeof limiterConfig['stores'];

  export interface LimiterStores extends Config {}
}
