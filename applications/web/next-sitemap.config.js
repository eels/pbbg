const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PROTOCOL = IS_PRODUCTION ? 'https' : 'http';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateIndexSitemap: false,
  siteUrl: `${PROTOCOL}://${process.env.APP_WEB_CLIENT_DOMAIN}`,
};
