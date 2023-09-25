function getCSRFSecret() {
  return new TextEncoder().encode(process.env.API_CSRF_SECRET);
}

async function createHash(message: string) {
  const number2hex = (number: number) => number.toString(16).padStart(2, '0');
  const data = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(hash)).reduce((s: string, n: number) => s + number2hex(n), '');
}

function randomString(size: number) {
  const number2hex = (number: number) => ('0' + number.toString(16)).slice(-2);
  const bytes = crypto.getRandomValues(new Uint8Array(size));

  return Array.from(bytes).reduce((s: string, n: number) => s + number2hex(n), '');
}

export function extractCSRFPartsFromCookie(cookie: string) {
  return cookie.split('|');
}

export async function createCSRFToken() {
  const token = randomString(32);
  const hash = await createHash(`${token}${getCSRFSecret().toString()}`);
  const cookie = `${token}|${hash}`;

  return { cookie, token };
}

export async function verifyCSRFToken(header: string, cookie: string) {
  const [token, hash] = extractCSRFPartsFromCookie(cookie);
  const expectedCSRFTokenHash = await createHash(`${token}${getCSRFSecret().toString()}`);
  const isCSRFTokenVerified = hash === expectedCSRFTokenHash && token === header;

  return { isCSRFTokenVerified, token };
}
