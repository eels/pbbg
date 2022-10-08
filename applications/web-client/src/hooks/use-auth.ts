import axios from 'config/axios';
import useSWRImmutable from 'swr/immutable';
import { API_USER_ROUTE } from 'config/constants';
import { handleLogin, handleLogout } from 'utilities/authentication';
import { noTryAsync } from 'no-try';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export interface AuthOptions {
  guard: 'guest' | 'member';
}

export function useAuth({ guard }: AuthOptions) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    const [error, response] = await noTryAsync(() => axios.get(API_USER_ROUTE));

    setIsLoading(false);

    if (error) {
      throw error;
    }

    return response.data.DATA;
  }, [setIsLoading]);

  const { data, error, mutate } = useSWRImmutable(API_USER_ROUTE, fetchUserData, {
    errorRetryCount: 0,
  });

  useEffect(() => {
    if (guard === 'guest' && data && router.pathname !== '/') {
      router.replace('/');
    }

    if (guard === 'member' && !data && error && router.pathname !== '/') {
      router.replace('/');
    }
  }, [data, error, router, guard]);

  return {
    handleLogin: handleLogin(router, mutate),
    handleLogout: handleLogout(router, mutate),
    isLoading,
    user: data,
  };
}
