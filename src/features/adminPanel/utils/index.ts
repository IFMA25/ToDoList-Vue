export const sameArray = (a: string[], b: string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

