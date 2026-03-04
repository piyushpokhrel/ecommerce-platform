import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useToastStore } from "../store";
import { getGithubReposForUser } from "../services/builder.service";

type Repo = {
    id: number;
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    url: string;
    language: string | null;
};

export default function BuilderPage() {
    const { addToast } = useToastStore();

    const [username, setUsername] = useState("");
    const [submittedUsername, setSubmittedUsername] = useState<string>("");
    const [repos, setRepos] = useState<Repo[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // small UX helper: auto-fill from last time
    useEffect(() => {
        const saved = localStorage.getItem("builder_username");
        if (saved) setUsername(saved);
    }, []);

    const canGenerate = username.trim().length >= 2 && !isLoading;

    const onGenerate = async () => {
        const u = username.trim();
        if (!u) return;

        localStorage.setItem("builder_username", u);
        setSubmittedUsername(u);

        setIsLoading(true);
        try {
            const data = await getGithubReposForUser(u);
            setRepos(data);
            addToast({ type: "success", message: `Loaded ${data.length} repos for ${u}` });
        } catch (e: any) {
            setRepos([]);
            addToast({
                type: "error",
                message: e?.message || "Failed to load repos. Check backend/CORS.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const sortedRepos = useMemo(() => {
        // sort: most starred, then forks
        return [...repos].sort((a, b) => {
            const ds = (b.stars ?? 0) - (a.stars ?? 0);
            if (ds !== 0) return ds;
            return (b.forks ?? 0) - (a.forks ?? 0);
        });
    }, [repos]);

    return (
        <div className="space-y-6">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
                <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-400/10" />

                <div className="relative">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        AI Portfolio Builder
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                        Enter a GitHub username to generate a clean portfolio preview from repos. Next we’ll add AI
                        summaries + themes + publish.
                    </p>

                    {/* Controls */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end">
                        <div className="flex-1">
                            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">
                                GitHub username
                            </label>
                            <Input
                                placeholder="e.g. piyushpokhrel"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                aria-label="GitHub username"
                            />
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="primary"
                                onClick={onGenerate}
                                disabled={!canGenerate}
                                isLoading={isLoading}
                            >
                                Generate
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setUsername("");
                                    setSubmittedUsername("");
                                    setRepos([]);
                                }}
                                disabled={isLoading}
                            >
                                Clear
                            </Button>
                        </div>
                    </div>

                    {/* Info row */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-800 dark:bg-slate-950/60">
                            Public preview (no login needed)
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 dark:border-slate-800 dark:bg-slate-950/60">
                            Save/Publish will require login later
                        </span>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {submittedUsername ? `Repos for ${submittedUsername}` : "Your repos will appear here"}
                </h2>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                    {repos.length ? `${repos.length} repos` : ""}
                </span>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-2 h-3 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-5 flex gap-2">
                                    <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                                    <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : repos.length === 0 ? (
                <Card>
                    <CardContent className="p-10 text-center">
                        <div className="text-5xl">✨</div>
                        <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
                            Generate your portfolio preview
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                            Type a GitHub username and hit <span className="font-semibold">Generate</span>.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sortedRepos.map((r) => (
                        <Card key={r.id} hoverable interactive onClick={() => window.open(r.url, "_blank")}>
                            <CardContent className="p-6">
                                <CardHeader>
                                    <CardTitle>{r.name}</CardTitle>

                                    {/* pill link that behaves in both themes */}
                                    <a
                                        href={r.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold
                      bg-white/70 text-slate-900 border-slate-200 hover:bg-white
                      dark:bg-slate-900/50 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-900/80
                      transition-colors"
                                    >
                                        View on GitHub →
                                    </a>
                                </CardHeader>

                                <p className="mt-3 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                                    {r.description ?? "No description provided."}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {r.language && (
                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
                                            {r.language}
                                        </span>
                                    )}
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                        ⭐ {r.stars ?? 0}
                                    </span>
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                        🍴 {r.forks ?? 0}
                                    </span>
                                </div>

                                {/* CTA row */}
                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        Next: AI summary + publish
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToast({
                                                type: "info",
                                                message: "Next step: we’ll generate AI descriptions & layout from this repo.",
                                                duration: 2500,
                                            });
                                        }}
                                    >
                                        Improve with AI
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}