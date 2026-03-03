import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";
import { NavLink } from "react-router-dom";

export function AboutPage() {
    return (
    <div className="space-y-6">
    <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">About</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
            A quick snapshot of who I am and what I’m building.
        </p>
        </div>

        <Card>
        <CardHeader>
            <CardTitle>What this site is</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-slate-700 dark:text-slate-200">
            <p>
            This is my portfolio dashboard showcasing projects across{" "}
            <span className="font-semibold">Java / Spring Boot</span>,{" "}
            <span className="font-semibold">TypeScript</span>,{" "}
            <span className="font-semibold">JavaScript</span>, HTML and CSS.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">
            Data is pulled from GitHub and rendered in a modern UI.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
            <NavLink to="/projects">
                <Button variant="primary">View Projects</Button>
            </NavLink>
            <NavLink to="/contact">
                <Button variant="secondary">Contact</Button>
            </NavLink>
            </div>
        </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
            <CardHeader><CardTitle>Focus</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            Security-minded engineering, clean architecture, and polished UX.
            </CardContent>
        </Card>

        <Card>
        <CardHeader><CardTitle>Stack</CardTitle></CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            Spring Boot, Postgres, React/Vite, Tailwind, Render deployment.
        </CardContent>
        </Card>

        <Card>
        <CardHeader><CardTitle>Goals</CardTitle></CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            Build full-stack projects while leveling up security + backend skills.
            </CardContent>
        </Card>
        </div>
    </div>
    );
}