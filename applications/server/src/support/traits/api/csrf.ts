import { Buffer } from 'buffer';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { Request, Response } from 'types/http';

const csrfCookie = 'csrf.token';
const sessionCookie = 'session.id';
const secret = process.env.APP_SECRET_CSRF_TOKEN;
const expiryDurationInMinutes = 15;

export function setCSRFToken(response: Response) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const session = randomBytes(20).toString('hex');
  const token = createHash('sha256').update(`${secret}.${session}.${epoch}`).digest('hex');

  response.cookie(sessionCookie, session, { httpOnly: true, signed: true });
  response.cookie(csrfCookie, token, { httpOnly: true, signed: true });
}

export function verifyCSRFToken(request: Request) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const storedToken = (request.signedCookies[csrfCookie] || '') as string;
  const storedSession = (request.signedCookies[sessionCookie] || '') as string;
  const token = createHash('sha256').update(`${secret}.${storedSession}.${epoch}`).digest('hex');

  if (token.length !== storedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}
