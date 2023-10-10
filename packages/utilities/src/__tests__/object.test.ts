import { get, set } from '@/utilities/object';

const mockject = {
  date: new Date(0).toISOString(),
  user: {
    age: 42,
    likes: ['pizza', 'ice cream'],
    location: 'Earth',
    name: 'John Doe',
  },
};

describe('get', () => {
  it('should return a top level value from a given object', () => {
    expect(get(mockject, 'date')).toBe(mockject.date);
  });

  it('should return a deep nested value from a given object', () => {
    expect(get(mockject, 'user.likes')).toBe(mockject.user.likes);
    expect(get(mockject, 'user.name')).toBe(mockject.user.name);
  });

  it('should return undefined if a given path does not exist', () => {
    expect(get(mockject, 'user.likes.food')).toBe(undefined);
    expect(get(mockject, 'user.location.street')).toBe(undefined);
    expect(get(mockject, 'user.gender')).toBe(undefined);
  });
});

describe('set', () => {
  it('should set a given value on a given object', () => {
    const mockject = {} as Record<string, any>;

    set(mockject, 'date', new Date(0).toISOString());
    set(mockject, 'user.age', 42);
    set(mockject, 'user.likes', ['pizza', 'ice cream']);

    expect(mockject.date).toBe(new Date(0).toISOString());
    expect(mockject.user.age).toBe(42);
    expect(mockject.user.likes).toEqual(['pizza', 'ice cream']);
  });
});
