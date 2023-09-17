'use client';

import RegistrationForm from '@pbbg/ui/src/components/molecules/registration-form';
import { useAuthentication } from '@pbbg/ui/src/hooks/use-authentication';

export default function ClientRegistrationForm() {
  const { handleOnRedirect, handleOnRegister } = useAuthentication();

  return <RegistrationForm onRedirect={handleOnRedirect} onRegister={handleOnRegister} />;
}
