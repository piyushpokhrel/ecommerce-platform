import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";

export function SponsorPage() {
    return (
    <div className="space-y-6">
        <Card>
        <CardHeader>
        <CardTitle>Sponsor this portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300">
            I offer multiple sponsor slots on the dashboard (high visibility), plus a dedicated sponsor section.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800/70">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Starter</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">1 month</div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">$17.99</div>
            </div>

            <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800/70">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Pro</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">3 months</div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">$28.99</div>
            </div>

            <div className="rounded-xl border border-slate-200/70 p-4 dark:border-slate-800/70">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">Premium</div>
                <div className="mt-1 text-xs text-slate-600 dark:text-slate-300">6 months</div>
                <div className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">$35.99</div>
            </div>
            </div>

            <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pokhrelpiyush78@gmail.com&su=Sponsorship%20Inquiry"
            target="_blank"
            rel="noopener noreferrer">
    <Button variant="primary">Become a sponsor</Button>
</a>
        </CardContent>
        </Card>
    </div>
    );
}