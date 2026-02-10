import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const currentTheme = ref<"light" | "dark" | "system">("light");

  const isDark = computed(() => currentTheme.value === "dark");
  const isLight = computed(() => currentTheme.value === "light");

  const setTheme = (theme: "light" | "dark") => {
    currentTheme.value = theme;
    updateDocumentTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleTheme = () => {
    const newTheme = currentTheme.value === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const theme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(theme);
  };

  const updateDocumentTheme = (theme: "light" | "dark") => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  return {
    currentTheme,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
    initTheme,
  };
});
