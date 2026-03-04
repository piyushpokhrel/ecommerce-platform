import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { applyTheme, getInitialTheme, type Theme } from "../utils/theme";
import { toggleTheme } from "../utils/theme";
import Sidebar from "./Sidebar";

export const Navbar = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const handleClick = () => {
    setSidebarOpen(true);
    setFlipped(true);

    // revert back to hand after 1.5s
    setTimeout(() => {
      setFlipped(false);
    }, 1500);
  };

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/projects", label: "Projects" },
    { path: "/builder", label: "Builder" },
  ];

  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <nav
      className="sticky top-0 z-40 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="rounded text-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              Portfolio
            </Link>

            <div className="hidden items-center gap-1 md:flex" role="menubar">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  role="menuitem"
                  className={clsx(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    location.pathname === item.path
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClick}
              className="relative rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-xl
            text-slate-900 hover:bg-white
            dark:border-slate-800 dark:bg-slate-950/60 dark:text-white dark:hover:bg-slate-900
              transition-all duration-200 active:scale-90"
              aria-label="Open menu"
            >
              {flipped ? "🖕" : "✋"}
            </button>
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="
                  inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold
                  bg-white/70 text-slate-900 border-slate-200 hover:bg-white
                  dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-900/80
                  transition-colors
                "
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button
              aria-label="Notifications"
              className="relative rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-2 dark:border-gray-700 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-1 px-4 sm:px-6 lg:px-8" role="menubar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              role="menuitem"
              className={clsx(
                "flex-1 rounded-lg px-4 py-2 text-center text-sm font-medium transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                location.pathname === item.path
                  ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <a
        href="https://github.com/piyushpokhrel"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </nav>

  );
};
