import { Exception } from '@adonisjs/core/build/standalone';
import { getStatusCode } from 'utilities/status';

export default class AuthenticationException extends Exception {
  constructor(message = 'unauthorized') {
    super(message, getStatusCode('UNAUTHORISED'));
  }
}
