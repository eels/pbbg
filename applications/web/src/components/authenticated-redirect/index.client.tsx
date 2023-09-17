'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useString } from '@pbbg/ui/src/hooks/use-string';

export interface AuthenticatedRedirectProps {
  allowAuthenticatedUsersOnly: boolean;
}

export default function AuthenticatedRedirect({
  allowAuthenticatedUsersOnly,
}: AuthenticatedRedirectProps) {
  const router = useRouter();
  const session = useSession();
  const { s } = useString();

  useEffect(() => {
    const destination = allowAuthenticatedUsersOnly ? 'router.index' : 'router.application';
    const status = allowAuthenticatedUsersOnly ? 'unauthenticated' : 'authenticated';

    if (session.status === status) {
      router.replace(s(destination));
    }
  }, [allowAuthenticatedUsersOnly, router, s, session.status]);

  return null;
}
