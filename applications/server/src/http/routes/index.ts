import app from 'application';
import type { Request, Response } from 'express';

app.get('/', (_: Request, response: Response) => {
  response.json({ message: 'hello world' });
});

app.post('/', (request: Request, response: Response) => {
  response.json(request.body);
});

app.all('*', (_: Request, response: Response) => {
  response.status(404);
  response.json({ message: 'not found', status: 404 });
});
