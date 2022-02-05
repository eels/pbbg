import type { Request, Response } from 'express';

export function NotAllowedHandler(_: Request, response: Response) {
  response.status(404).json({ message: 'not found', status: 404 });
}
