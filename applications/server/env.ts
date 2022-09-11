import Env from '@ioc:Adonis/Core/Env';

const rules = {
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  APP_USE_SECURE_COOKIE_PREFIX: Env.schema.boolean(),
  DB_CONNECTION: Env.schema.string(),
  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_NAME: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_PORT: Env.schema.number(),
  DB_USERNAME: Env.schema.string(),
  DRIVE_DISK: Env.schema.enum(['local'] as const),
  HOST: Env.schema.string({ format: 'host' }),
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  SESSION_COOKIE: Env.schema.string(),
  SESSION_DRIVER: Env.schema.enum(['cookie', 'file', 'redis'] as const),
};

export default Env.rules(rules);
