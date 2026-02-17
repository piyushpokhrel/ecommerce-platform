export type Theme = "light" | "dark";

export function applyTheme(theme: Theme) {
  const root = document.documentElement; // <html>
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
}

export function getInitialTheme(): Theme {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved === "light" || saved === "dark") return saved;

  // default: follow system
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
}
