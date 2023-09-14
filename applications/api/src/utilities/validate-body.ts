import BadDataError from '@pbbg/http/lib/exceptions/bad-data';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTry } from '@pbbg/utilities/lib/try';
import type { Controller } from '@pbbg/http/lib/types/http';
import type { Request } from 'express';
import type { ZodType } from 'zod';

type DropFirst<T extends unknown[]> = T extends [any, ...infer U] ? U : never;

export function ValidateRequestBody(validator: ZodType) {
  return (target: Controller, member: string, descriptor: PropertyDescriptor) => {
    const fn = target[member as keyof Controller];

    descriptor.value = function (request: Request, ...rest: DropFirst<Parameters<typeof fn>>) {
      const [error] = pleaseTry(() => validator.parse(request.body));

      if (error) {
        throw new BadDataError(exceptions.BAD_DATA);
      }

      return fn.apply(this, [request, ...rest]);
    };
  };
}
