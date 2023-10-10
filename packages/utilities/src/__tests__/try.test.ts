import { pleaseTry, pleaseTryAsync } from '@/utilities/try';

const TestError = new Error('test');

function fn(shouldThrow: boolean) {
  if (shouldThrow) {
    throw TestError;
  }

  return true;
}

function promisify(callback: ReturnType<typeof fn>) {
  return new Promise((resolve) => resolve(callback));
}

describe('pleaseTry', () => {
  it('should return the result with no error when the callback is successful', () => {
    const result = pleaseTry(() => fn(false));

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual([null, true]);
  });

  it('should return no result with an error when the callback is not successful', () => {
    const result = pleaseTry(() => fn(true));

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual([TestError, null]);
  });
});

describe('pleaseTryAsync', () => {
  it('should return the result with no error when the callback is successful', async () => {
    const result = await pleaseTryAsync(() => promisify(fn(false)));

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual([null, true]);
  });

  it('should return no result with an error when the callback is not successful', async () => {
    const result = await pleaseTryAsync(() => promisify(fn(true)));

    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toEqual([TestError, null]);
  });
});
