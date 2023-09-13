export function hydrate(string: string, variables: string[] = []) {
  const words = string?.split(' ');
  const hydrated: string[] = [];

  for (let word of words ?? []) {
    word = word.replace(/%\d+/g, (num) => {
      return variables[parseInt(num.replace('%', '')) - 1] ?? num;
    });

    hydrated.push(word);
  }

  return hydrated.join(' ');
}

export function hydrateWithJSX<T>(string: string, variables: T[] = []) {
  const words = string?.split(/(%\d+)/g).filter((section) => section !== '') as (string | T)[];
  const hydrated: (string | T)[] = [];

  for (let word of words ?? []) {
    if (/%\d+/g.test(word as string) && typeof word === 'string') {
      word = variables[parseInt(word.replace('%', '')) - 1] ?? word;
    }

    hydrated.push(word);
  }

  return hydrated;
}

export function hydrateFromVariableMap(string: string, variables: Record<string, string>) {
  const entries = Object.entries(variables);

  for (const [variable, value] of entries) {
    string = string.replace(new RegExp(variable, 'g'), value);
  }

  return string;
}
