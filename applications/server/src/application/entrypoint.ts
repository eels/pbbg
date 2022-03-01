import app from 'application/http';
import log from 'support/facades/log';
import { POST_STACK, PREP_STACK, registerMiddlewareStack } from 'providers/middleware';
import { manageGracefulShutdown } from 'utilities/graceful-shutdown';

// --- Sentry -----------------------------------

require('bootstrap/sentry');

// --- Prep middleware --------------------------

registerMiddlewareStack(PREP_STACK);

// --- Routes -----------------------------------

require('http/routes');

// --- Post middleware --------------------------

registerMiddlewareStack(POST_STACK);

// --- Server -----------------------------------

const port = process.env.NODE_PORT;
const server = app.listen(port || 4000, () => log.info(`Listening on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  manageGracefulShutdown(server);
}
