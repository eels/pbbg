import AuthenticationError from '@pbbg/http/lib/exceptions/authentication';
import CredentialsProvider from 'next-auth/providers/credentials';
import InternalError from '@pbbg/http/lib/exceptions/internal';
import { cradle } from '@/web/server/container';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { AuthOptions } from 'next-auth';
import type { AuthResponse } from '@pbbg/database-types/lib/types';
import type { ClientResponseError } from 'pocketbase';

export const authOptions: AuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      const session = {
        id: user?.id,
      };

      return Promise.resolve(user ? Object.assign({}, token, { user: session }) : token);
    },
    async session({ session, token }) {
      session.user = {
        id: token?.user?.id,
      };

      return Promise.resolve(session);
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const [error, user] = await pleaseTryAsync<AuthResponse, ClientResponseError>(() => {
          return cradle.AuthenticationQuery.authenticate(credentials.email, credentials.password);
        });

        if (error && error?.status === 400) {
          throw new AuthenticationError(exceptions.INVALID_CREDENTIALS);
        }

        if (error && error?.status !== 400) {
          throw new InternalError(exceptions.INTERNAL_ERROR);
        }

        return Promise.resolve(user?.record ? user?.record : null);
      },
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        password: {
          label: 'password',
          type: 'password',
        },
      },
    }),
  ],
};
