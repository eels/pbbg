import { removeExtension } from '@/utilities/extensions';

describe('removeExtension', () => {
  it('removes the file extension', () => {
    const filename = 'example.txt';
    const result = removeExtension(filename);

    expect(result).toBe('example');
  });
});
