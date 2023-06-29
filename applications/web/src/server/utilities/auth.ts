import CredentialsProvider from 'next-auth/providers/credentials';
import type { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      async authorize() {
        return {
          id: 'test',
          name: 'test user',
        };
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
