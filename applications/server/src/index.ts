import app from 'application';
import log from 'support/facades/log';
import path from 'path';
import { config } from 'dotenv';
import { startGracefulShutdown } from 'utilities/graceful-shutdown';
import type { Request, Response } from 'express';

if (process.env.NODE_ENV !== 'production') {
  config({ path: path.resolve('../../', '.env') });
}

require('http/routes');

app.all('*', (_: Request, response: Response) => {
  response.status(404);
  response.json({ message: 'not found', status: 404 });
});

const port = process.env.NODE_PORT;
const server = app.listen(port, () => log.info(`Listening on port ${port}`));
const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];

signals.forEach((signal) => process.on(signal, () => startGracefulShutdown(server)));
