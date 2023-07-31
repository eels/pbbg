import { Exception } from '@/http/types/exception';

export default class BadDataError extends Exception {
  public code: number;
  public message: Lowercase<string>;

  public constructor(message: Lowercase<string>) {
    super(message);

    this.code = 400;
    this.message = message;
  }
}
