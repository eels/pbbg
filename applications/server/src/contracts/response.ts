import type { Blank } from 'types/object';
import type { ResponseOptions } from 'types/response';
import type { Status } from 'types/http';

declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    respond<T = Blank>(status: Status, response?: ResponseOptions<T>): this;
  }
}
