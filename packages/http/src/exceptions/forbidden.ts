import { Exception } from '@/http/types/exception';

export default class ForbiddenError extends Exception {
  public code: number;
  public message: Lowercase<string>;

  public constructor(message: Lowercase<string>) {
    super(message);

    this.code = 403;
    this.message = message;
  }
}
