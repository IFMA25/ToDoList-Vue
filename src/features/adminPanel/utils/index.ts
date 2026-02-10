import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";

export const sameArray = (a: string[], b: string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

export function formatDate(date: Date | string | number) {
  const d = new Date(date);

  const language = useLanguageStore().currentLang;

  const locale = language === "ua" ? "uk-UA" : "en-GB";

  return new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}
