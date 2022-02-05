import type { Request, Response } from 'express';

export function ApplicationHandler(_: Request, response: Response) {
  response.status(200).json({});
}
