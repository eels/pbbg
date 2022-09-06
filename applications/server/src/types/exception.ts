import type { Exception as BaseException } from '@adonisjs/core/build/standalone';
import type { StatusCode } from 'types/http';

export interface Exception extends BaseException {
  status: StatusCode;
}
