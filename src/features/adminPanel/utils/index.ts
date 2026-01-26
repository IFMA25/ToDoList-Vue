export const sameArray = (a: string[], b: string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

export function formatDate(date: Date | string | number) {
  const d = new Date(date);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}
