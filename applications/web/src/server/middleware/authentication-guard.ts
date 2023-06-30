import AuthenticationError from '@/web/server/exceptions/authentication';
import { getCurrentUser } from '@/web/utilities/session';
import type { AsyncHandler } from '@/web/types/http';

export class AuthenticationGuard {
  public static handle: AsyncHandler = async (request, response, next) => {
    const user = await getCurrentUser(request, response);

    if (!user) {
      throw new AuthenticationError('access denied');
    }

    next();
  };
}
