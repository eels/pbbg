import { Exception } from '@/http/types/exception';

export default class AuthenticationError extends Exception {
  public code: number;
  public message: Lowercase<string>;

  public constructor(message: Lowercase<string>) {
    super(message);

    this.code = 401;
    this.message = message;
  }
}
