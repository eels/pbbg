import { trimObjectStringValues } from 'utilities/trim-object-string-values';

describe('utilities/trim-object-string-values', () => {
  it('should trim top level string values in a supplied object', () => {
    const object = {
      name: ' example ',
    };

    expect(trimObjectStringValues(object)).toEqual({
      name: 'example',
    });
  });

  it('should not mutate any number values in a supplied object', () => {
    const object = {
      age: 20,
      name: ' example ',
    };

    expect(trimObjectStringValues(object)).toEqual({
      age: 20,
      name: 'example',
    });
  });

  it('should recursively trim string values in a supplied object', () => {
    const object = {
      name: {
        first: ' example ',
        last: ' example ',
      },
    };

    expect(trimObjectStringValues(object)).toEqual({
      name: {
        first: 'example',
        last: 'example',
      },
    });
  });

  it('should trim the values from arrays in a supplied object when the value is a string', () => {
    const object = {
      values: [' example ', 20, ' example '],
    };

    expect(trimObjectStringValues(object)).toEqual({
      values: ['example', 20, 'example'],
    });
  });
});
