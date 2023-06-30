import { Exception } from '@/web/types/exception';

export default class AuthenticationError extends Exception {
  public code: number;

  public constructor(message: string) {
    super(message);

    this.code = 401;
  }
}
