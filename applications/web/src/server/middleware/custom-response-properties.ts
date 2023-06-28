import { response as responseFactory } from '@/web/server/utilities/response';
import type { AsyncHandler } from '@/web/types/http';

export class CustomResponseProperties {
  public static handle: AsyncHandler = async (_, response, next) => {
    response.respond = responseFactory(response);
    next();
  };
}
