import { Buffer } from 'buffer';
import { cookie } from 'utilities/cookie';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { CookieOptions } from 'express';
import type { Request, Response } from 'types/http';

const csrfCookie = cookie('csrf.token');
const sessionCookie = cookie('session.id');
const secret = process.env.APP_SECRET_CSRF_TOKEN;
const expiryDurationInMinutes = 15;

export function setCSRFToken(response: Response) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const session = randomBytes(20).toString('hex');
  const token = createHash('sha256').update(`${secret}.${session}.${epoch}`).digest('hex');
  const options = { httpOnly: true, sameSite: 'strict', secure: true, signed: true };

  response.cookie(sessionCookie, session, options as CookieOptions);
  response.cookie(csrfCookie, token, options as CookieOptions);
}

export function verifyCSRFToken(request: Request) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const storedToken = request.signedCookies[csrfCookie];
  const storedSession = request.signedCookies[sessionCookie];
  const token = createHash('sha256').update(`${secret}.${storedSession}.${epoch}`).digest('hex');

  if (token.length !== storedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}
