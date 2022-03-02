import app from 'application/http';
import { IS_PRODUCTION } from 'config/constants';
import { Integrations as NodeIntegrations, init } from '@sentry/node';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new NodeIntegrations.Http({ tracing: true }),
    new TracingIntegrations.Express({ app: app }),
  ],

  tracesSampleRate: IS_PRODUCTION ? 0.25 : 0,
});
