import { SignJWT, jwtVerify } from 'jose';
import type { Session } from '@pbbg/http/lib/types/session';

const algorithm = 'HS256';

function getJWTSecret() {
  return new TextEncoder().encode(process.env.AUTH_JWT_SECRET);
}

export async function encodeJWT(payload: Session) {
  const { APP_WEB_HOST } = process.env;

  if (!APP_WEB_HOST) {
    throw new Error('web host not configured');
  }

  const token = new SignJWT(payload);

  token.setProtectedHeader({ alg: algorithm });
  token.setIssuedAt();
  token.setIssuer(APP_WEB_HOST);
  token.setAudience(APP_WEB_HOST);
  token.setSubject(payload.email);
  token.setExpirationTime('2h');

  return await token.sign(getJWTSecret());
}

export async function decodeJWT(token: string) {
  return (await jwtVerify(token, getJWTSecret())).payload as Session;
}
