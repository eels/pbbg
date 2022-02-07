import log from 'support/facades/log';
import { sleep } from 'utilities/sleep';
import type { Server } from 'http';
import type { Socket } from 'net';

const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];
const connections: Socket[] = [];

export function manageShutdownCleanup(error?: Error) {
  log.info('Server shut down');

  if (error) {
    log.error(error.message);
  }

  process.exit(error ? 1 : 0);
}

export function removeConnectionFromPool(connection: Socket) {
  const connectionIndex = connections.findIndex((value) => value === connection);

  if (connectionIndex !== -1) {
    delete connections[connectionIndex];
  }
}

export function addConnectionToPool(connection: Socket) {
  connections.push(connection);

  connection.on('close', () => removeConnectionFromPool(connection));
}

export async function startGracefulShutdown(server: Server) {
  log.info('Gracefully shutting down server');
  server.close((error?: Error) => manageShutdownCleanup(error));
  connections.forEach((connection) => connection.end());

  await sleep(5000);
  connections.forEach((connection) => connection.destroy());

  await sleep(10000);
  log.error('Could not close all server connections, forcefully shutting down');
  process.exit(1);
}

export function manageGracefulShutdown(server: Server) {
  signals.forEach((signal) => process.on(signal, () => startGracefulShutdown(server)));

  server.on('connection', (connection) => addConnectionToPool(connection));
}
