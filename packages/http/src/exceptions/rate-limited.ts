import { Exception } from '@/http/types/exception';

export default class RateLimitedError extends Exception {
  public code: number;
  public message: Lowercase<string>;

  public constructor(message: Lowercase<string>) {
    super(message);

    this.code = 429;
    this.message = message;
  }
}
