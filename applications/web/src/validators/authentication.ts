// import { getString } from '@/web/utilities/string';
import { z } from 'zod';

export function validateAuthLogin() {
  return z.object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  });
}
