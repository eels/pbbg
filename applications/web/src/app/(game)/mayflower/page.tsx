'use client';

import Button from '@/web/components/atoms/button';
import LoadingIndicator from '@/web/components/molecules/loading-indicator';
import { useAuthentication } from '@/web/hooks/use-authentication';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useString } from '@/web/hooks/use-string';

export default function Mayflower() {
  const router = useRouter();
  const session = useSession();
  const { handleOnLogout } = useAuthentication();
  const { s } = useString();

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace(s('router.index'));
    }
  }, [router, s, session.status]);

  if (session.status === 'loading') {
    return <LoadingIndicator className='w-screen h-screen' />;
  }

  return <Button onClick={handleOnLogout}>Logout</Button>;
}
