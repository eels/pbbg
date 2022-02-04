import { createLogger, format, transports } from 'winston';

const logOptions = {
  format: format.simple(),
  level: 'info',
  transports: [
    new transports.Console({
      level: 'info',
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/combined.log',
    }),
  ],
};

const log = createLogger(logOptions);

export default log;
