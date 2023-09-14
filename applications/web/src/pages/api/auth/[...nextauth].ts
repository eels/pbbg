import NextAuth from 'next-auth';
import { authOptions } from '@pbbg/api/src/utilities/auth';

export default NextAuth(authOptions);
