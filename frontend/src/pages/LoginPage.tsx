import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Button } from "../components/Button";

export default function LoginPage() {
    return (
    <div className="space-y-6">
        <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Login</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
            Authentication page (placeholder).
        </p>
        </div>

        <Card>
        <CardHeader><CardTitle>Coming soon</CardTitle></CardHeader>
        <CardContent className="space-y-4 text-slate-600 dark:text-slate-300">
            <p className="text-sm">
            This page will connect to your backend auth (JWT / sessions).
            </p>
            <Button variant="primary" disabled>
            Sign in
            </Button>
        </CardContent>
        </Card>
    </div>
    );
}