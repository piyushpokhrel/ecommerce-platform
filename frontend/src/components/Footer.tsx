import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

                {/* About */}
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                        Portfolio
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        A personal developer portfolio showcasing projects, experiments,
                        and open-source work. Built with React, TypeScript and modern UI.
                    </p>
                </div>

                {/* Quick navigation */}
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        Navigation
                    </h4>

                    <div className="flex flex-col gap-2 text-sm">
                        <Link to="/" className="hover:text-indigo-500">
                            Dashboard
                        </Link>
                        <Link to="/projects" className="hover:text-indigo-500">
                            Projects
                        </Link>
                        <Link to="/about" className="hover:text-indigo-500">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-indigo-500">
                            Contact
                        </Link>
                    </div>
                </div>

                {/* Remember us / support */}
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        Support
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        If you like the projects here, consider supporting or sharing them.
                    </p>

                    <a
                        href="https://github.com/piyushpokhrel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                    >
                        ⭐ Star on GitHub
                    </a>
                </div>

                {/* Tech + license */}
                <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        Tech Stack
                    </h4>

                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        React · TypeScript · Tailwind · Spring Boot
                    </p>

                    <p className="text-xs text-slate-500 mt-3">
                        Licensed under MIT License
                    </p>
                </div>

            </div>

            {/* bottom copyright bar */}
            <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Piyush Pokhrel — All rights reserved
            </div>
        </footer>
    );
};