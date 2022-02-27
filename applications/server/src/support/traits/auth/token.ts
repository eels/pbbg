import { Buffer } from 'buffer';
import { SignJWT, jwtVerify } from 'jose';
import { cookie } from 'utilities/cookie';
import type { CookieOptions, Request, Response } from 'express';

type Payload = Record<string, string>;

const headerCookie = cookie('auth.headers');
const signitureCookie = cookie('auth.signiture');
const secret = process.env.APP_SECRET_JWT_TOKEN as string;

export async function createAuthenticationToken(payload: Payload) {
  const jwt = new SignJWT({ payload: payload });

  jwt.setExpirationTime('30m');
  jwt.setIssuedAt();
  jwt.setProtectedHeader({ alg: 'HS256' });

  return await jwt.sign(Buffer.from(secret));
}

export function deleteAuthenticationTokens(response: Response) {
  response.clearCookie(headerCookie);
  response.clearCookie(signitureCookie);
}

export function getAuthenticationToken(request: Request) {
  const headers = request.signedCookies[headerCookie];
  const signiture = request.signedCookies[signitureCookie];

  return [headers, signiture].join('.');
}

export function seperateAuthenticationToken(token: string) {
  const [signiture, ...rest] = token.split('.').reverse();
  const payload = rest.reverse().join('.');

  return [payload, signiture];
}

export async function setAuthenticationTokens(response: Response, payload: Payload) {
  const token = await createAuthenticationToken(payload);
  const [headers, signiture] = seperateAuthenticationToken(token);
  const options = { maxAge: 30 * 60 * 1000, sameSite: 'strict', secure: true, signed: true };

  response.cookie(headerCookie, headers, options as CookieOptions);
  response.cookie(signitureCookie, signiture, { ...(options as CookieOptions), httpOnly: true });
}

export async function validateAuthenticationToken(request: Request) {
  const token = getAuthenticationToken(request);

  return await jwtVerify(token, Buffer.from(secret));
}
