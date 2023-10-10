import { sleep } from '@/utilities/sleep';

describe('sleep', () => {
  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should resolve after a specified time', () => {
    const start = Date.now();

    sleep(1000);
    jest.runAllTimers();

    expect(Date.now()).toEqual(start + 1000);
  });
});
