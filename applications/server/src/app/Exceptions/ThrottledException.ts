import { Exception } from '@adonisjs/core/build/standalone';
import { getStatusCode } from 'utilities/status';

export default class ThrottledException extends Exception {
  constructor(message = 'too many requests') {
    super(message, getStatusCode('RATE-LIMITED'));
  }
}
