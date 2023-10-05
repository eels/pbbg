const NON_PROD_ROBOTS_TXT = [
  '# --- DEFAULT -----------------------------------',
  '',
  'User-agent: *',
  'Disallow: /',
];

const PROD_ROBOTS_TXT = [
  '# --- DEFAULT -----------------------------------',
  '',
  'User-agent: *',
  'Disallow: /!',
];

export async function GET() {
  const IS_PRODUCTION = process.env.NODE_IS_PRODUCTION === 'true';
  const content = IS_PRODUCTION ? PROD_ROBOTS_TXT : NON_PROD_ROBOTS_TXT;

  return new Response(content.join('\n'));
}
