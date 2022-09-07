import type { AuthConfig } from '@ioc:Adonis/Addons/Auth';

const authConfig: AuthConfig = {
  /*
  |--------------------------------------------------------------------------
  | Guard
  |--------------------------------------------------------------------------
  |
  | The default guard for authenticating user requests
  |
  */

  guard: 'api',

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | A collection of guards you want to use within your application. You
  | can switch the guards at runtime using the `auth.use` method.
  |
  */

  guards: {
    api: {
      driver: 'session',
      provider: {
        driver: 'lucid',
        identifierKey: 'id',
        model: () => import('App/Models/User'),
        uids: ['email'],
      },
    },
  },
};

export default authConfig;
