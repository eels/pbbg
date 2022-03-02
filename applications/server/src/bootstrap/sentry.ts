import app from 'application/http';
import { Integrations as NodeIntegrations, init } from '@sentry/node';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new NodeIntegrations.Http({ tracing: true }),
    new TracingIntegrations.Express({ app: app }),
  ],

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.25 : 0,
});
