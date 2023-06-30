import { authOptions } from '@/web/server/utilities/auth';
import { getServerSession } from 'next-auth';
import type { Request, Response } from 'express';
import type { Session } from 'next-auth';

export async function getCurrentUser(request?: Request, response?: Response) {
  let session: Session | null;

  if (request && response) {
    session = await getServerSession(request, response, authOptions);
  } else {
    session = await getServerSession(authOptions);
  }

  return session?.user;
}
