import { forwardRef } from "react";
import { clsx } from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export const Button = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    fullWidth?: boolean;
  }
>(function Button(
  {
    children,
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    fullWidth = false,
    disabled,
    ...props
  },
  ref
) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 font-medium rounded-xl " +
    "transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] " +
    "select-none";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  }[size];

  // “Premium” variants: more subtle, less cartoon-y
  const variants: Record<ButtonVariant, string> = {
    primary:
      "text-white shadow-sm " +
      "bg-gradient-to-b from-slate-900 to-slate-800 hover:to-slate-700 " +
      "dark:from-white dark:to-slate-200 dark:text-slate-900 " +
      "focus:ring-slate-400 dark:focus:ring-white/40 " +
      "border border-white/10 dark:border-black/10",

    secondary:
      "text-slate-900 bg-white/70 backdrop-blur border border-slate-200/70 shadow-sm hover:shadow " +
      "hover:bg-white dark:text-slate-100 dark:bg-slate-900/40 dark:border-slate-800/70 dark:hover:bg-slate-900/60 " +
      "focus:ring-slate-400 dark:focus:ring-slate-600",

    outline:
      "text-slate-900 bg-transparent border border-slate-300/80 hover:bg-slate-50 " +
      "dark:text-slate-100 dark:border-slate-700/80 dark:hover:bg-slate-900/40 " +
      "focus:ring-slate-400 dark:focus:ring-slate-600",

    ghost:
      "text-slate-800 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-slate-800/50 " +
      "focus:ring-slate-400 dark:focus:ring-slate-600",

    danger:
      "text-white shadow-sm " +
      "bg-gradient-to-b from-red-600 to-red-700 hover:to-red-600 " +
      "focus:ring-red-400 border border-white/10",
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={clsx(base, sizes, variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {/* Subtle “mandala / luxury” halo + animated sheen */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200",
          "group-hover:opacity-100"
        )}
      />

      {/* Hover glow ring */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute -inset-[2px] rounded-[14px] opacity-0 blur-sm transition-opacity duration-200",
          variant === "primary" && "bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/25 to-cyan-500/25",
          variant === "secondary" && "bg-slate-500/10",
          variant === "danger" && "bg-red-500/25",
          "hover:opacity-100"
        )}
      />

      {/* Animated sheen line */}
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-xl",
          (variant === "primary" || variant === "danger") && "opacity-100",
          !(variant === "primary" || variant === "danger") && "opacity-60"
        )}
      >
        <span className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-120%] hover:translate-x-[240%] transition-transform duration-700" />
      </span>

      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      <span className="relative">{children}</span>
    </button>
  );
});

Button.displayName = "Button";