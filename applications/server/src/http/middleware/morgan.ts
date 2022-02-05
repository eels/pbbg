import log from 'support/facades/log';
import middleware from 'morgan';
import type { StreamOptions } from 'morgan';

const format = ':method :url :status - :response-time ms';
const stream: StreamOptions = { write: (message) => log.http(message.trim()) };

export function morgan() {
  return middleware(format, { stream });
}
