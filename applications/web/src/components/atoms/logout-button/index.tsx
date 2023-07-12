'use client';

import Button from '@/web/components/atoms/button';
import { Fragment } from 'react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Fragment>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </Fragment>
  );
}
