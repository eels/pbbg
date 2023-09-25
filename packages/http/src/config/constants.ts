// --- COOKIES ----------------------------------

const HOST_PREFIX = process.env.NODE_ENV === 'production' ? '__Host-' : '';
const SECURE_PREFIX = process.env.NODE_ENV === 'production' ? '__Secure-' : '';

export const AUTH_COOKIE_NAME = `${SECURE_PREFIX}PBBG.SESSION`;
export const CSRF_COOKIE_NAME = `${HOST_PREFIX}PBBG.CSRF`;

// --- HEADERS ----------------------------------

export const CSRF_HEADER_NAME = 'x-csrf-token';
