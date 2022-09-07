import Env from '@ioc:Adonis/Core/Env';
import { limiterConfig } from '@adonisjs/limiter/build/config';

export default limiterConfig({
  /*
  |--------------------------------------------------------------------------
  | Default store
  |--------------------------------------------------------------------------
  |
  | The default store for persisting rate limiter data
  |
  */

  default: 'db',

  /*
  |--------------------------------------------------------------------------
  | Stores
  |--------------------------------------------------------------------------
  |
  | A collection of stores you want to use within your application. You
  | can switch the stores at runtime using the `Limiter.use` method.
  |
  */

  stores: {
    db: {
      clearExpiredByTimeout: true,
      client: 'db',
      connectionName: Env.get('DB_CONNECTION'),
      dbName: Env.get('PG_DB_NAME'),
      tableName: 'rate_limits',
    },
  },
});
