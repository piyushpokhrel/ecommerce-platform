export const Card = ({ children, className = "", hoverable, interactive, onClick }) => {
  const classes = [
    "rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur shadow-sm",
    "dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-black/10",
    hoverable ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg" : "",
    interactive ? "cursor-pointer" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={["px-6 pt-6", className].join(" ")}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={["text-lg font-semibold text-gray-900 dark:text-white", className].join(" ")}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={["px-6 pb-6", className].join(" ")}>{children}</div>
);