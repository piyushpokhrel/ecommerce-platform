import { NavLink } from "react-router-dom";

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
    return (
    <>
      {/* overlay */}
        <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
        />

      {/* panel */}
        <aside
        className={[
            "fixed left-0 top-0 z-50 h-full w-72",
            "bg-white/80 backdrop-blur border-r border-slate-200",
            "dark:bg-slate-950/70 dark:border-slate-800",
            "transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="font-bold text-slate-900 dark:text-white">Menu</div>
            <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
            ✕
            </button>
        </div>

        <nav className="p-3 space-y-1">
            {[
            { to: "/", label: "Dashboard" },
            { to: "/projects", label: "Projects" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
            { to: "/sponsor", label: "Sponsor" },
            { to: "/login", label: "Login" },
            { to: "/orders", label: "Orders" },
            ].map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                [
                    "block rounded-xl px-3 py-2 text-sm font-semibold",
                    isActive
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900",
                ].join(" ")
                }
            >
                {item.label}
            </NavLink>
            ))}
        </nav>
        </aside>
    </>
    );
}