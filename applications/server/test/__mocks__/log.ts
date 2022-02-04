interface Logger {
  [key: string]: jest.Mock;
}

const methods = ['debug', 'error', 'info', 'log', 'warn'];
const log: Logger = methods.reduce((obj, current) => ({ ...obj, [current]: jest.fn() }), {});

jest.mock('support/facades/log', () => log);

export default log;
