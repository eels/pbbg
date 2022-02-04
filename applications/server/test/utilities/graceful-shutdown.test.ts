import { startGracefulShutdown } from 'utilities/graceful-shutdown';

describe('utilities/graceful-shutdown', () => {
  beforeEach(() => {
    jest.mock('support/facades/log', () => jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call the server `close` method', () => {
    const server = { close: jest.fn() } as any;

    startGracefulShutdown(server);

    expect(server.close).toHaveBeenCalled();
  });
});
