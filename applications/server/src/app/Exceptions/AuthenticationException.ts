import type { Status } from 'types/http';

export default class AuthenticationException {
  constructor(public message: string, public status: Status) {
    this.message = message;
    this.status = status;
  }
}
