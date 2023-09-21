import BadDataError from '@/http/exceptions/bad-data';
import { exceptions } from '@/http/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { Context } from 'hono';
import type { Controller } from '@/http/types/http';
import type { ZodType } from 'zod';

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export function ValidateRequestBody(validator: ZodType) {
  return (target: Controller, member: string, descriptor: PropertyDescriptor) => {
    const fn = target[member as keyof Controller];

    type Fn = typeof fn;

    descriptor.value = async function (context: Context, ...rest: DropFirst<Parameters<Fn>>) {
      const [error] = await pleaseTryAsync(() => validator.parse(context.req.json()));

      if (error) {
        throw new BadDataError(exceptions.BAD_DATA);
      }

      return fn.apply(this, [context, ...rest]);
    };
  };
}
