'use client';

import LoginForm from '@/web/components/molecules/login-form';
import { useAuthentication } from '@/web/hooks/use-authentication';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useString } from '@/web/hooks/use-string';

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const { handleOnRedirect, handleOnSignIn } = useAuthentication();
  const { s } = useString();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace(s('router.application'));
    }
  }, [router, s, session.status]);

  return <LoginForm onRedirect={handleOnRedirect} onSignIn={handleOnSignIn} />;
}
