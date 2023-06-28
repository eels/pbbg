import app from '@/web/server';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return app.handle(req, res);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
