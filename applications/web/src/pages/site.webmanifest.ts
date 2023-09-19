const content = `
{
  "name": "PBBG",
  "short_name": "PBBG",
  "description": "PBBG",
  "lang": "en-GB",
  "start_url": "/",
  "theme_color": "#0a0a0a",
  "background_color": "#0a0a0a",
  "display": "standalone",
  "icons": [
    {
      "purpose": "maskable",
      "sizes": "192x192",
      "src": "/favicon/192x192-maskable.png",
      "type": "image/png"
    },
    {
      "purpose": "maskable",
      "sizes": "512x512",
      "src": "/favicon/512x512-maskable.png",
      "type": "image/png"
    },
    {
      "sizes": "192x192",
      "src": "/favicon/192x192.png",
      "type": "image/png"
    },
    {
      "sizes": "512x512",
      "src": "/favicon/512x512.png",
      "type": "image/png"
    }
  ]
}
`;

export async function GET() {
  return new Response(content.trim());
}
