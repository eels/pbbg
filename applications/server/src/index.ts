import express from 'express';
import { PrismaClient } from '@prisma/client';
import type { Request, Response } from 'express';

const app = express();
const signals = ['SIGHUP', 'SIGINT', 'SIGTERM'];
const prisma = new PrismaClient();

app.get('/', async (_: Request, response: Response) => {
  const users = await prisma.user.findMany();

  response.json(users);
});

const server = app.listen(process.env.NODE_PORT, () => {
  console.log(`Listening on port ${process.env.NODE_PORT}`);
});

function startGracefulShutdown() {
  console.log('Gracefully shutting down server');

  server.close();
}

signals.forEach((signal) => process.on(signal, startGracefulShutdown));
