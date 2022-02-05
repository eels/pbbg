import { convertEmptyObjectStringValuesToNull } from 'utilities/convert-empty-object-string-values-to-null';

describe('utilities/convert-empty-object-string-values-to-null', () => {
  it('should convert top level string values to null in a supplied object', () => {
    const object = {
      name: '',
    };

    expect(convertEmptyObjectStringValuesToNull(object)).toEqual({
      name: null,
    });
  });

  it('should not mutate any number values in a supplied object', () => {
    const object = {
      age: 20,
      name: '',
    };

    expect(convertEmptyObjectStringValuesToNull(object)).toEqual({
      age: 20,
      name: null,
    });
  });

  it('should not mutate any null values in a supplied object', () => {
    const object = {
      age: 20,
      name: null,
    };

    expect(convertEmptyObjectStringValuesToNull(object)).toEqual({
      age: 20,
      name: null,
    });
  });

  it('should recursively convert string values to null in a supplied object', () => {
    const object = {
      name: {
        first: '',
        last: '',
      },
    };

    expect(convertEmptyObjectStringValuesToNull(object)).toEqual({
      name: {
        first: null,
        last: null,
      },
    });
  });

  it('should convert the values from arrays in a supplied object to null when the value is a string', () => {
    const object = {
      values: ['', 20, ''],
    };

    expect(convertEmptyObjectStringValuesToNull(object)).toEqual({
      values: [null, 20, null],
    });
  });
});
