import Env from '@ioc:Adonis/Core/Env';
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database';

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */

  connection: Env.get('DB_CONNECTION'),

  /*
  |--------------------------------------------------------------------------
  | Connections
  |--------------------------------------------------------------------------
  |
  | A collection of connections you want to use within your application. You
  | can switch the connection at runtime using the `Databse.use` method.
  |
  */

  connections: {
    pg: {
      client: 'pg',
      connection: {
        database: Env.get('PG_DB_NAME'),
        host: Env.get('PG_HOST'),
        password: Env.get('PG_PASSWORD', ''),
        port: Env.get('PG_PORT'),
        user: Env.get('PG_USERNAME'),
      },
      debug: false,
      healthCheck: false,
      migrations: {
        naturalSort: true,
      },
    },
  },
};

export default databaseConfig;
