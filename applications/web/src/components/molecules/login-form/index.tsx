'use client';

import { signIn } from 'next-auth/react';
import type { FormEvent } from 'react';

export default function LoginForm() {
  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn('credentials', { callbackUrl: '/' });
  };

  return (
    <form onSubmit={handleSignIn}>
      <button>Login</button>
    </form>
  );
}
