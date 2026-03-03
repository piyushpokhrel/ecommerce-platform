import { Button } from "./Button";

type Props = {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaHref?: string;
};

export function SponsorBanner({
    title = "Sponsor / Support this portfolio",
    subtitle = "Want your brand featured here? I offer a clean sponsor spot + click tracking.",
    ctaText = "Become a sponsor",
    ctaHref = "mailto:your.email@example.com?subject=Sponsorship%20Inquiry",
}: Props) {
    return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70 backdrop-blur shadow-sm
                    dark:border-slate-800/70 dark:bg-slate-900/40">
      {/* subtle glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-400/10" />

        <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Sponsor spot
            </div>

            <h3 className="mt-2 text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100">
            {title}
            </h3>

            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {subtitle}
            </p>
        </div>

        <div className="flex items-center gap-3">
            <a
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref.startsWith("http") ? "noreferrer" : undefined}
            >
            <Button variant="primary">{ctaText}</Button>
            </a>

            <a
            href="/sponsor"
            className="text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition"
            >
            Learn more →
            </a>
        </div>
        </div>
    </div>
    );
}