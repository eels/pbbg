import timestring from 'timestring';
import { deleteCookie, getSignedCookie, setSignedCookie } from 'hono/cookie';
import type { Context } from 'hono';
import type { CookieOptions } from 'hono/utils/cookie';

const options: CookieOptions = {
  domain: process.env.AUTH_COOKIE_DOMAIN,
  httpOnly: true,
  maxAge: timestring('1 month', 'ms'),
  path: '/',
  sameSite: 'Strict',
  secure: process.env.NODE_ENV === 'production',
};

function getCookieSecret() {
  return new TextEncoder().encode(process.env.AUTH_COOKIE_SECRET);
}

export async function getCookie(context: Context, name: string) {
  return await getSignedCookie(context, getCookieSecret(), name);
}

export async function setCookie(context: Context, name: string, value: string) {
  return await setSignedCookie(context, name, value, getCookieSecret(), options);
}

export async function delCookie(context: Context, name: string) {
  const { domain, path, secure } = options;

  deleteCookie(context, name, { domain, path, secure });
}

export async function setSessionCookie(context: Context, name: string, value: string) {
  const session = { ...options, maxAge: undefined };

  return await setSignedCookie(context, name, value, getCookieSecret(), session);
}
