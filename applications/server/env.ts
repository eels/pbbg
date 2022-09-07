import Env from '@ioc:Adonis/Core/Env';

const rules = {
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  DB_CONNECTION: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  HOST: Env.schema.string({ format: 'host' }),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PG_DB_NAME: Env.schema.string(),
  PG_HOST: Env.schema.string({ format: 'host' }),
  PG_PASSWORD: Env.schema.string.optional(),
  PG_PORT: Env.schema.number(),
  PG_USERNAME: Env.schema.string(),
  PORT: Env.schema.number(),
};

export default Env.rules(rules);
