import NextAuth from 'next-auth';
import { authOptions } from '@/web/server/utilities/auth';

export default NextAuth(authOptions);
