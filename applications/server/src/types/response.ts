import type { Blank } from 'types/object';
import type { Object } from 'ts-toolbelt';
import type { Status, StatusCode } from 'types/http';

export interface Options<T = Blank> {
  data: T;
  message: string;
}

export type ResponseOptions<T = Blank> = Object.AtLeast<Options<T>, 'data' | 'message'>;

export interface ResponseObject<T = Blank> {
  CODE: StatusCode;
  DATA?: T;
  MESSAGE?: string;
  STATUS: Status;
}
