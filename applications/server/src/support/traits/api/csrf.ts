import { Buffer } from 'buffer';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { Request, Response } from 'types/http';

export function setCSRFToken(response: Response) {
  const sessionToken = randomBytes(20).toString('hex');
  const staticCSRFToken = process.env.APP_SECRET_CSRF_TOKEN;
  const token = createHash('sha256').update(`${sessionToken}.${staticCSRFToken}`).digest('hex');

  response.cookie('session_token', sessionToken, { httpOnly: true, signed: true });
  response.cookie('csrf_token', token, { httpOnly: true, signed: true });
}

export function verifyCSRFToken(request: Request) {
  const sessionToken = request.signedCookies.session_token;
  const staticCSRFToken = process.env.APP_SECRET_CSRF_TOKEN;
  const token = createHash('sha256').update(`${sessionToken}.${staticCSRFToken}`).digest('hex');
  const CSRFToken = (request.signedCookies.csrf_token || '') as string;

  if (token.length !== CSRFToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(CSRFToken), Buffer.from(token));
}
