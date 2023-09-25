import { axiosInstance } from '@pbbg/ui/lib/utilities/axios';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Session } from '@pbbg/http/lib/types/session';

export async function getSession(request: Request) {
  const { APP_WEB_HOST } = process.env;
  const { headers } = request;

  const session = await axiosInstance.get<Session>(
    new URL('/api/user/session', APP_WEB_HOST).toString(),
    {
      headers: Object.fromEntries(headers),
      withCredentials: true,
    },
  );

  return session.data;
}

export async function doesUserHaveValidSession(request: Request) {
  const [error, session] = await pleaseTryAsync(() => getSession(request));

  return !error && !!session;
}
