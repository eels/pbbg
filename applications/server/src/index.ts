import app from 'application';
import log from 'support/facades/log';
import { startGracefulShutdown } from 'utilities/graceful-shutdown';

// --- Environment variables --------------------

require('bootstrap/environment');

// --- Middleware -------------------------------

require('providers/middleware');

// --- Routes -----------------------------------

require('http/routes');

const port = process.env.NODE_PORT;
const server = app.listen(port, () => log.info(`Listening on port ${port}`));
const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];

signals.forEach((signal) => process.on(signal, () => startGracefulShutdown(server)));
