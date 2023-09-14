import isStrongPassword from 'validator/lib/isStrongPassword';
import { z } from 'zod';

const strongPassword = z.string().refine((value) => isStrongPassword(value), {
  message: 'Password is not strong enough',
});

interface ValidateAuthOptions {
  isRegister?: boolean;
}

export function validateAuthentication({ isRegister = false }: ValidateAuthOptions = {}) {
  return z.object({
    email: z.string().email(),
    password: isRegister ? strongPassword : z.string().min(1),
  });
}
