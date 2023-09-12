import { Exception } from '@/http/types/exception';

export default class InternalError extends Exception {
  public code: number;
  public message: Lowercase<string>;

  public constructor(message: Lowercase<string>) {
    super(message);

    this.code = 500;
    this.message = message;
  }
}
