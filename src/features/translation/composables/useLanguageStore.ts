import { defineStore } from "pinia";
import { ref } from "vue";

import i18n from "@/shared/i18n";

const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE || "en";
const supportedLocales = (import.meta.env.VITE_SUPPORTED_LOCALE || "en,ua")
  .split(",")
  .map((l: string) => l.trim().toLowerCase());

const normalizeLocale = (raw: string) => raw.toLowerCase().split("-")[0];

export const useLanguageStore = defineStore("language", () => {

  const currentLang = ref<string>(defaultLocale);

  const setLanguage = (lang: string) => {

    currentLang.value = lang;
    i18n.global.locale.value = lang;
    localStorage.setItem("lang", lang);
    document.querySelector("html")?.setAttribute("lang", lang);
  };

  const initLanguage = () => {

    const savedLang = localStorage.getItem("lang");
    if (savedLang && supportedLocales.includes(normalizeLocale(savedLang))) {
      setLanguage(savedLang);
      return;
    }

    const browserLang = normalizeLocale(window.navigator.language);
    if (supportedLocales.includes(browserLang)) {
      setLanguage(browserLang);
      return;
    }

    setLanguage(defaultLocale);
  };

  return { currentLang, supportedLocales: supportedLocales, setLanguage, initLanguage };
});
