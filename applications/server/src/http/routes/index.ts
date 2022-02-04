import app from 'application';
import type { Request, Response } from 'express';

app.get('/', (_: Request, response: Response) => {
  response.json({ message: 'hello world' });
});
