import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.get('/', (_: Request, response: Response) => {
  response.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
