import { Buffer } from 'buffer';
import { IS_PRODUCTION } from 'config/constants';
import { cookie } from 'utilities/cookie';
import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import type { CookieOptions } from 'express';
import type { Request, Response } from 'types/http';

const requestCookie = cookie('request.token');
const sessionCookie = cookie('session.id');
const secret = process.env.APP_SECRET_REQUEST_TOKEN;
const expiryDurationInMinutes = 15;

export function setRequestToken(response: Response) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const session = randomBytes(20).toString('hex');
  const token = createHash('sha256').update(`${secret}.${session}.${epoch}`).digest('hex');

  const options: CookieOptions = {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: true,
    signed: true,
  };

  if (IS_PRODUCTION) {
    options.domain = process.env.APP_WEB_CLIENT_DOMAIN;
  }

  response.cookie(sessionCookie, session, options);
  response.cookie(requestCookie, token, options);
}

export function verifyRequestToken(request: Request) {
  const epoch = Math.floor(Date.now() / 1000 / (expiryDurationInMinutes * 60));
  const storedToken = request.signedCookies[requestCookie];
  const storedSession = request.signedCookies[sessionCookie];
  const token = createHash('sha256').update(`${secret}.${storedSession}.${epoch}`).digest('hex');

  if (token.length !== storedToken.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(token), Buffer.from(storedToken));
}
