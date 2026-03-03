import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";

export default function OrdersPage() {
    return (
    <div className="space-y-6">
        <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Orders</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
            Orders dashboard (placeholder).
        </p>
        </div>

        <Card>
        <CardHeader><CardTitle>No orders yet</CardTitle></CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-300">
            This will show order history once your ecommerce backend endpoints are wired up.
        </CardContent>
        </Card>
    </div>
    );
}