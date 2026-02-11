import { defineStore } from "pinia";
import { ref } from "vue";

import i18n from "@/shared/i18n";

const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE || "en";
const SUPPORTED_LOCALES = (import.meta.env.VITE_SUPPORTED_LOCALE || "en,ua")
  .split(",")
  .map((l: string) => l.trim().toLowerCase());

const normalizeLocale = (raw: string) => raw.toLowerCase().split("-")[0];

export const useLanguageStore = defineStore("language", () => {

  const currentLang = ref<string>(DEFAULT_LOCALE);

  const setLanguage = (lang: string) => {

    currentLang.value = lang;
    i18n.global.locale.value = lang;
    localStorage.setItem("lang", lang);
    document.querySelector("html")?.setAttribute("lang", lang);
  };

  const initLanguage = () => {

    const savedLang = localStorage.getItem("lang");
    if (savedLang && SUPPORTED_LOCALES.includes(normalizeLocale(savedLang))) {
      setLanguage(savedLang);
      return;
    }

    const browserLang = normalizeLocale(window.navigator.language);
    if (SUPPORTED_LOCALES.includes(browserLang)) {
      setLanguage(browserLang);
      return;
    }

    setLanguage(DEFAULT_LOCALE);
  };

  return { currentLang, supportedLocales: SUPPORTED_LOCALES, setLanguage, initLanguage };
});
