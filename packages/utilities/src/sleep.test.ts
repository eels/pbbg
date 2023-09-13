import { sleep } from '@/utilities/sleep';

describe('sleep', () => {
  it('resolves after specified time', async () => {
    const start = Date.now();

    await sleep(1000);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});
