'use client';

import LoginForm from '@/web/components/molecules/login-form';
import RegistrationForm from '@/web/components/molecules/registration-form';
import { Fragment, useEffect } from 'react';
import { useAuthentication } from '@/web/hooks/use-authentication';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useString } from '@/web/hooks/use-string';

export default function Home() {
  const router = useRouter();
  const session = useSession();
  const { handleOnLogin, handleOnRedirect, handleOnRegister } = useAuthentication();
  const { s } = useString();

  useEffect(() => {
    if (session.status === 'authenticated') {
      router.replace(s('router.application'));
    }
  }, [router, s, session.status]);

  return (
    <Fragment>
      <LoginForm onLogin={handleOnLogin} onRedirect={handleOnRedirect} />
      <RegistrationForm onRedirect={handleOnRedirect} onRegister={handleOnRegister} />
    </Fragment>
  );
}
