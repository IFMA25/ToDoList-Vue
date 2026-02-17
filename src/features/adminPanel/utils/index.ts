import { useLanguageStore } from "@/features/translation/composables/useLanguageStore";

export const sameArray = (a: string[], b: string[]) =>
  a.length === b.length && a.every((x, i) => x === b[i]);

export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
) {
  const d = new Date(date);
  const language = useLanguageStore().currentLang;
  const locale = language === "ua" ? "uk-UA" : "en-GB";

  let result = new Intl.DateTimeFormat(locale, options).format(d);

  if (language === "ua") {
    result = result.replace(/\s*р\.?$/i, "");
  }

  return result;
}

