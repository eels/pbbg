// --- Flags ------------------------------------

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// --- App --------------------------------------

export const PROTOCOL = IS_PRODUCTION ? 'https' : 'http';

export const SERVER_DOMAIN = `${PROTOCOL}://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}`;

export const WEB_CLIENT_DOMAIN = `${PROTOCOL}://${process.env.NEXT_PUBLIC_WEB_CLIENT_DOMAIN}`;

// --- Blog -------------------------------------

export const POSTS_PER_PAGE = 1;
