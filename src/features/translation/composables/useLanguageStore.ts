import { defineStore } from "pinia";
import { ref } from "vue";

import i18n from "../../../shared/i18n";

export const useLanguageStore = defineStore("language", () => {
  const currentLang = ref("EN");

  const defaultLocale = () => {
    return import.meta.env.VITE_DEFAULT_LOCALE;
  };
  const supportedLocales = () => {
    return import.meta.env.VITE_SUPPORTED_LOCALE.split(", ");
  };

  const setLanguage = (lang: string) => {
    currentLang.value = lang;
    i18n.global.locale.value = lang;
    localStorage.setItem("lang", lang);
    document.querySelector("html").setAttribute("lang", lang);
  };

  const getUserLocale = () => {
    const locale = window.navigator.language || defaultLocale();

    return {
      locale,
      localeNoRegion: String(locale).split("-")[0],
    };
  };

  const savedLang = localStorage.getItem("lang") || null;
  if (typeof savedLang === "string") {
    currentLang.value = savedLang;
  } else {
    const userLocale = getUserLocale();
    if (userLocale.locale) {
      currentLang.value = userLocale.locale;
    }
    if (userLocale.localeNoRegion) {
      currentLang.value = userLocale.localeNoRegion;
    }
  }

  return {
    currentLang,
    savedLang,
    supportedLocales,
    setLanguage,
  };
});
