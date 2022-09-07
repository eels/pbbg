import { getStatusCode } from 'utilities/status';
import type { Blank } from 'types/object';
import type { ResponseObject, ResponseOptions } from 'types/response';
import type { Status } from 'types/http';

export function createResponseObject<T = Blank>(status: Status, response?: ResponseOptions<T>) {
  const responseObject: ResponseObject<T> = {
    CODE: getStatusCode(status),
    DATA: response?.data,
    MESSAGE: response?.message?.toLowerCase() as Lowercase<string> | undefined,
    STATUS: status,
  };

  if (!response?.data) {
    delete responseObject.DATA;
  }

  if (!response?.message) {
    delete responseObject.MESSAGE;
  }

  return responseObject;
}
