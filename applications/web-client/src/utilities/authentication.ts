import axios from 'config/axios';
import { API_LOGIN_ROUTE, API_LOGOUT_ROUTE } from 'config/constants';
import { noTryAsync } from 'no-try';
import type { KeyedMutator } from 'swr';
import type { NextRouter } from 'next/router';

export function handleLogin<T = any>(router: NextRouter, mutate?: KeyedMutator<T>) {
  return async (payload: Record<string, any>) => {
    const [error] = await noTryAsync(() => axios.post(API_LOGIN_ROUTE, payload));

    if (error) {
      throw new Error(error.message);
    }

    if (typeof mutate !== 'undefined') {
      mutate();
    }

    router.replace('/');
  };
}

export function handleLogout<T = any>(router: NextRouter, mutate?: KeyedMutator<T>) {
  return async () => {
    await axios.post(API_LOGOUT_ROUTE);

    if (typeof mutate !== 'undefined') {
      mutate(undefined);
    }

    router.replace('/');
  };
}
