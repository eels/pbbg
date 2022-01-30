import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.get('/', (_: Request, response: Response) => {
  response.send('Hello world!');
});

app.listen(process.env.NODE_PORT, () => {
  console.log('Listening on port 4000');
});
