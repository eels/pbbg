const content = `
/* --- TEAM ------------------------------------- */

Webmaster: Liam Howell
Website: https://liam.codes

/* --- SITE ------------------------------------- */

Doctype: HTML5
Language: English
Last update: ${new Date().toUTCString()}
`;

export async function GET() {
  return new Response(content.trim());
}
