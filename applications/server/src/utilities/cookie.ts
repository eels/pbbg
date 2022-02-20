export function cookie(cookie: string) {
  return process.env.APP_USE_SECURE_COOKIE_PREFIX ? `__Secure-${cookie}` : cookie;
}
