'use client';

import Button from '@/web/components/atoms/button';
import { useAuthentication } from '@/web/hooks/use-authentication';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useString } from '@/web/hooks/use-string';

export default function Mayflower() {
  const router = useRouter();
  const session = useSession();
  const { handleOnSignOut } = useAuthentication();
  const { s } = useString();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace(s('router.index'));
    }
  }, [router, s, session.status]);

  return <Button onClick={handleOnSignOut}>Sign out</Button>;
}
