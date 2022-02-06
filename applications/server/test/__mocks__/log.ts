type Log = Record<string, jest.Mock>;

const methods = ['debug', 'error', 'http', 'info', 'log', 'warn'];
const log: Log = methods.reduce((obj, current) => ({ ...obj, [current]: jest.fn() }), {});

jest.mock('support/facades/log', () => log);

export default log;
