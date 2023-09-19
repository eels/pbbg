const content = `
/* --- DEFAULT ---------------------------------- */

User-agent: *
Disallow: /
`;

export async function GET() {
  return new Response(content.trim());
}
