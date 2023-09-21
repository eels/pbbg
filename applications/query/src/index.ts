import application from '@/query/application';
import { serve } from '@hono/node-server';

const PORT = process.env.APP_QUERY_PORT ? parseInt(process.env.APP_QUERY_PORT) : 8092;

serve({ fetch: application.fetch, port: PORT }, () => console.log(`Listening on port ${PORT}`));
