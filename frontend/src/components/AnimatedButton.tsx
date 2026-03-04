import { clsx } from "clsx";

export const AnimatedButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "glass" }> = ({ children, variant = "primary", className = "", ...props }) => {
return (
    <button
    {...props}
    className={clsx(
        "inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold transition-transform duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && "bg-gradient-to-br from-indigo-600 to-blue-500 text-white shadow-lg hover:scale-[1.02] active:scale-95",
        variant === "glass" && "bg-white/10 border border-white/8 text-white backdrop-blur-md hover:bg-white/20",
        className
    )}
    >
    {children}
    </button>
);
};