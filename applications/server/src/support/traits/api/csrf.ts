import { Buffer } from 'buffer';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { Request, Response } from 'types/http';

const csrfCookie = 'csrf.token';
const sessionCookie = 'session.id';
const secret = process.env.APP_SECRET_CSRF_TOKEN;
const expiryDurationInMinutes = 15;

export async function setCSRFToken(response: Response) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const session = randomBytes(20).toString('hex');
  const token = createHash('sha256').update(`${secret}.${session}.${epoch}`).digest('hex');
  const cookieOptions = { httpOnly: true, secure: true, signed: true };

  response.cookie(sessionCookie, session, cookieOptions);
  response.cookie(csrfCookie, token, cookieOptions);
}

export async function verifyCSRFToken(request: Request) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const storedToken = request.signedCookies[csrfCookie];
  const storedSession = request.signedCookies[sessionCookie];
  const token = createHash('sha256').update(`${secret}.${storedSession}.${epoch}`).digest('hex');

  if (token.length !== storedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}
