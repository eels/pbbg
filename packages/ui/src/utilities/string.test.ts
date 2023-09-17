/** @jest-environment node */

import { getString } from '@/ui/utilities/string';
import type { StringKey } from '@/ui/types/strings';

describe('getString', () => {
  const mockString = 'Hello, world!';

  it('returns the correct string', () => {
    global.nextstring = {
      'general.example': mockString,
    };

    expect(getString('general.example')).toBe(mockString);
  });

  it('returns undefined if the string key is not found', () => {
    expect(getString('nonExistentString' as StringKey)).toBeUndefined();
  });
});
