import app from 'application';
import log from 'support/facades/log';
import { POST_STACK, PREP_STACK, registerMiddlewareStack } from 'providers/middleware';
import { startGracefulShutdown } from 'utilities/graceful-shutdown';

// --- Sentry -----------------------------------

require('bootstrap/sentry');

// --- Pre-controller middleware ----------------

registerMiddlewareStack(PREP_STACK);

// --- Routes -----------------------------------

require('http/routes');

// --- Post-controller middleware ---------------

registerMiddlewareStack(POST_STACK);

// --- Server -----------------------------------

const port = process.env.NODE_PORT;
const server = app.listen(port, () => log.info(`Listening on port ${port}`));
const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];

signals.forEach((signal) => process.on(signal, () => startGracefulShutdown(server)));
