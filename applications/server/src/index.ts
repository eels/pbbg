import app from 'application';
import log from 'support/facades/log';
import { registerMiddlewareStack } from 'providers/middleware';
import { startGracefulShutdown } from 'utilities/graceful-shutdown';

// --- Environment variables --------------------

require('bootstrap/environment');

// --- Sentry -----------------------------------

require('bootstrap/sentry');

// --- Pre-controller middleware ----------------

registerMiddlewareStack('pre-controller');

// --- Routes -----------------------------------

require('http/routes');

// --- Post-controller middleware ---------------

registerMiddlewareStack('post-controller');

// --- Server -----------------------------------

const port = process.env.NODE_PORT;
const server = app.listen(port, () => log.info(`Listening on port ${port}`));
const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];

signals.forEach((signal) => process.on(signal, () => startGracefulShutdown(server)));
