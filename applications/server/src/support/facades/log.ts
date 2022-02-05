import { createLogger, format, transports } from 'winston';
import type { TransformableInfo } from 'logform';

function level(level: string) {
  return format((info: TransformableInfo) => (info.level === level ? info : false))();
}

const { simple } = format;
const { Console, File } = transports;

const transportOptions = [
  new Console({
    level: 'info',
  }),
  new File({
    filename: 'logs/combined.log',
  }),
  new File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  new File({
    filename: 'logs/http.log',
    format: level('http'),
    level: 'http',
  }),
];

const log = createLogger({
  format: simple(),
  level: 'info',
  transports: transportOptions,
});

export default log;
