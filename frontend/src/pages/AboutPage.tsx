export default function AboutPage () {
return (
    <div className="space-y-6">
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/50">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        About
    </h1>
    <p className="text-slate-600 dark:text-slate-300">
        I build full-stack projects with React/Vite on the frontend and Spring Boot on the backend.
        This dashboard pulls my latest repositories from GitHub and shows them with a clean UI.
        </p>  <p className="text-slate-600 dark:text-slate-300">
        Tech I work with: TypeScript, Java, Spring Boot, PostgreSQL, REST APIs, Security basics, and modern UI systems.
    </p>
    </div>
    </div>
);
}