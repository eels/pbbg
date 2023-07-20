import 'next-auth';
import 'next-auth/jwt';

export interface User {
  id?: string;
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
  }
}
