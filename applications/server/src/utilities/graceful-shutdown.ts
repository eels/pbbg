import log from 'support/facades/log';
import type { Server } from 'http';

export function startGracefulShutdown(server: Server) {
  server.close((error?: Error) => {
    log.info('Server gracefully shut down');
    error && log.error(error.message);
  });
}
