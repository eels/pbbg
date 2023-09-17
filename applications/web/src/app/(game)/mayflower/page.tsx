'use client';

import AuthenticatedRedirect from '@/web/components/authenticated-redirect/index.client';
import Button from '@pbbg/ui/src/components/atoms/button';
// import LoadingIndicator from '@pbbg/ui/src/components/molecules/loading-indicator';
import { Fragment } from 'react';
import { useAuthentication } from '@pbbg/ui/src/hooks/use-authentication';

export default function Mayflower() {
  const { handleOnLogout } = useAuthentication();

  return (
    <Fragment>
      <AuthenticatedRedirect allowAuthenticatedUsersOnly={true} />
      <Button onClick={handleOnLogout}>Logout</Button>
    </Fragment>
  );
}
