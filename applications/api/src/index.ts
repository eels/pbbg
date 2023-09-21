import application from '@/api/application';
import { serve } from '@hono/node-server';

const PORT = process.env.APP_API_PORT ? parseInt(process.env.APP_API_PORT) : 8091;

serve({ fetch: application.fetch, port: PORT }, () => console.log(`Listening on port ${PORT}`));
