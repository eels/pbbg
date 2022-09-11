import Env from '@ioc:Adonis/Core/Env';

export function computeCookieName(cookie: string) {
  return Env.get('APP_USE_SECURE_COOKIE_PREFIX', '0') === true ? `__Secure-${cookie}` : cookie;
}
