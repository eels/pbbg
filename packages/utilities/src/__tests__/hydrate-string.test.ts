import { hydrate, hydrateFromVariableMap, hydrateWithJSX } from '@/utilities/hydrate-string';

const hydratable = {
  a: 'Hello %1, how are you feeling %2?',
  b: 'Hello name, how are you feeling mood?',
};

describe('hydrate', () => {
  it('should replace variables in a string', () => {
    const result = hydrate(hydratable.a, ['Alice', 'today']);

    expect(result).toEqual('Hello Alice, how are you feeling today?');
  });

  it('should handle missing variables', () => {
    const result = hydrate(hydratable.a, ['Alice']);

    expect(result).toEqual('Hello Alice, how are you feeling %2?');
  });

  it('should handle empty string', () => {
    const result = hydrate('', ['Alice', 'today']);

    expect(result).toEqual('');
  });

  it('should handle empty variables', () => {
    const result = hydrate(hydratable.a, []);

    expect(result).toEqual('Hello %1, how are you feeling %2?');
  });
});

describe('hydrateWithJSX', () => {
  it('should replace variables in a string', () => {
    const result = hydrateWithJSX(hydratable.a, ['Alice', 'today']);

    expect(result).toEqual(['Hello ', 'Alice', ', how are you feeling ', 'today', '?']);
  });

  it('should handle missing variables', () => {
    const result = hydrateWithJSX(hydratable.a, ['Alice']);

    expect(result).toEqual(['Hello ', 'Alice', ', how are you feeling ', '%2', '?']);
  });

  it('should handle empty string', () => {
    const result = hydrateWithJSX('', ['Alice', 'today']);

    expect(result).toEqual([]);
  });

  it('should handle empty variables', () => {
    const result = hydrateWithJSX(hydratable.a, []);

    expect(result).toEqual(['Hello ', '%1', ', how are you feeling ', '%2', '?']);
  });
});

describe('hydrateFromVariableMap', () => {
  it('should replace variables in a string', () => {
    const variables = { mood: 'happy', name: 'Alice' };
    const result = hydrateFromVariableMap(hydratable.b, variables);

    expect(result).toEqual('Hello Alice, how are you feeling happy?');
  });

  it('should handle missing variables', () => {
    const variables = { name: 'Alice' };
    const result = hydrateFromVariableMap(hydratable.b, variables);

    expect(result).toEqual('Hello Alice, how are you feeling mood?');
  });

  it('should handle extra variables', () => {
    const variables = { extra: 'value', mood: 'happy', name: 'Alice' };
    const result = hydrateFromVariableMap(hydratable.b, variables);

    expect(result).toEqual('Hello Alice, how are you feeling happy?');
  });

  it('should handle empty string', () => {
    const variables = { mood: 'happy', name: 'Alice' };
    const result = hydrateFromVariableMap('', variables);

    expect(result).toEqual('');
  });

  it('should handle empty variables', () => {
    const variables = {};
    const result = hydrateFromVariableMap(hydratable.b, variables);

    expect(result).toEqual('Hello name, how are you feeling mood?');
  });
});
