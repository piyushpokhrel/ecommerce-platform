export type Theme = "light" | "dark";

const KEY = "theme";

export function applyTheme(theme: Theme) {
  const root = document.documentElement; // <html>
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEY, theme);
}

export function getInitialTheme(): Theme {
  const saved = localStorage.getItem(KEY) as Theme | null;
  if (saved === "light" || saved === "dark") return saved;

  // fallback to system preference
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  applyTheme(isDark ? "light" : "dark");
}