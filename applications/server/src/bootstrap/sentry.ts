import { init } from '@sentry/node';

init({ dsn: process.env.SENTRY_DSN });
