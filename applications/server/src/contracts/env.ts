import type CustomTypes from '../../env'; // eslint-disable-line import/no-relative-parent-imports

declare module '@ioc:Adonis/Core/Env' {
  type BB = typeof CustomTypes;

  interface EnvTypes extends BB {}
}
