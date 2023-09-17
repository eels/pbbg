'use client';

import LoginForm from '@pbbg/ui/src/components/molecules/login-form';
import { useAuthentication } from '@pbbg/ui/src/hooks/use-authentication';

export default function ClientLoginForm() {
  const { handleOnLogin, handleOnRedirect } = useAuthentication();

  return <LoginForm onLogin={handleOnLogin} onRedirect={handleOnRedirect} />;
}
