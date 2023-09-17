import AuthenticatedRedirect from '@/web/components/authenticated-redirect/index.client';
import ClientLoginForm from '@/web/components/login-form/index.client';
import ClientRegistrationForm from '@/web/components/registration-form/index.client';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <AuthenticatedRedirect allowAuthenticatedUsersOnly={false} />
      <ClientLoginForm />
      <ClientRegistrationForm />
    </Fragment>
  );
}
