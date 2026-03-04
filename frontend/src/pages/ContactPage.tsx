import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";

export default function ContactPage() {
    return (
    <div className="space-y-6">
        <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Contact</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
            Reach out for collaboration, opportunities, or sponsorship.
        </p>
        </div>

        <Card>
        <CardHeader>
            <CardTitle>Quick links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
            <a
            href="https://github.com/piyushpokhrel"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button variant="secondary">GitHub</Button>
            </a>

            <a
            href="https://www.linkedin.com/in/piyushpokhrel7789"
            target="_blank"
            rel="noopener noreferrer"
            >
            <Button variant="secondary">LinkedIn</Button>
            </a>

            <a
            href="mailto:your.email@example.com?subject=Portfolio%20Contact"
            >
            <Button variant="primary">Email Me</Button>
            </a>
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle>Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-600 dark:text-slate-300">
            <p className="text-sm">
            Prefer a form? I can add a premium contact form that works without backend
            (Formspree/Getform), and shows a success toast.
            </p>
        </CardContent>
        </Card>
    </div>
    );
}