import { Buffer } from 'buffer';
import { SignJWT, jwtVerify } from 'jose';
import type { Request, Response } from 'express';

type Payload = Record<string, string>;

const authHeaderCookie = 'auth.headers';
const authSignitureCookie = 'auth.signiture';
const secret = process.env.APP_SECRET_JWT_TOKEN as string;

export async function createAuthenticationToken(payload: Payload) {
  const jwt = new SignJWT({ payload: payload });

  jwt.setExpirationTime('30m');
  jwt.setIssuedAt();
  jwt.setProtectedHeader({ alg: 'HS256' });

  return await jwt.sign(Buffer.from(secret));
}

export async function deleteAuthenticationTokens(response: Response) {
  response.clearCookie(authHeaderCookie);
  response.clearCookie(authSignitureCookie);
}

export async function getAuthenticationToken(request: Request) {
  const headers = request.signedCookies[authHeaderCookie];
  const signiture = request.signedCookies[authSignitureCookie];

  return [headers, signiture].join('.');
}

export async function seperateAuthenticationToken(token: string) {
  const [signiture, ...rest] = token.split('.').reverse();
  const payload = rest.reverse().join('.');

  return [payload, signiture];
}

export async function setAuthenticationTokens(response: Response, payload: Payload) {
  const token = await createAuthenticationToken(payload);
  const [headers, signiture] = await seperateAuthenticationToken(token);
  const cookieOptions = { maxAge: 30 * 60 * 1000, secure: true, signed: true };

  response.cookie(authHeaderCookie, headers, cookieOptions);
  response.cookie(authSignitureCookie, signiture, { ...cookieOptions, httpOnly: true });
}

export async function validateAuthenticationToken(request: Request) {
  const token = await getAuthenticationToken(request);

  return await jwtVerify(token, Buffer.from(secret));
}
