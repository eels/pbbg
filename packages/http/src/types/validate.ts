import type { ZodType, z } from 'zod';

export type Validator = (...args: any[]) => ZodType;
export type Data<T extends Validator> = z.infer<ReturnType<T>>;
