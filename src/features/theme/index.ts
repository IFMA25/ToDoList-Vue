/**
 * Theme Feature
 *
 * Provides theme management functionality including:
 * - Theme toggle component
 * - Theme state management
 * - Theme utilities for Tailwind CSS
 *
 * @example
 * ```ts
 * import { ThemeToggle, useTheme } from '@/features/theme';
 *
 * const { isDark, toggleTheme } = useTheme();
 * ```
 */


export { useThemeStore } from "./store/useThemeStore";
export { createThemes } from "./utils/createThemes";

