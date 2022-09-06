import Env from '@ioc:Adonis/Core/Env';
import { hashConfig } from '@adonisjs/core/build/config';

export default hashConfig({
  /*
  |--------------------------------------------------------------------------
  | Default hasher
  |--------------------------------------------------------------------------
  |
  | By default we make use of the argon hasher to hash values. However, feel
  | free to change the default value
  |
  */

  default: Env.get('HASH_DRIVER', 'argon'),

  /*
  |--------------------------------------------------------------------------
  | Hashes
  |--------------------------------------------------------------------------
  |
  | A collection of hashing modules you want to use within your application.
  | You can switch the disks at runtime using the `Hash.use` method.
  |
  */

  list: {
    argon: {
      driver: 'argon2',
      iterations: 3,
      memory: 4096,
      parallelism: 1,
      saltSize: 16,
      variant: 'id',
    },
  },
});
