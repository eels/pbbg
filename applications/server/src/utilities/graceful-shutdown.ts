import log from 'support/facades/log';
import type { Server } from 'http';

export function startGracefulShutdown(server: Server) {
  log.info('Gracefully shutting down server');

  server.close();
}
