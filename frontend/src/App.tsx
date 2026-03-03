import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { DetailsPanel } from "./components/DetailsPanel";
import { ToastContainer } from "./components/Toast";
import { Dashboard } from "./pages/DashboardPage";
import { Projects } from "./pages/Projects";
import { useDetailsPanelStore } from "./store";
import { SponsorPage } from "./pages/SponsorPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { OrdersPage } from "./pages/OrdersPage";

function App() {
    const { isOpen } = useDetailsPanelStore();

    return (
    <BrowserRouter>
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Premium ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-400/10" />
        <div className="absolute top-24 right-[-6rem] h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl dark:bg-fuchsia-400/10" />
        <div className="absolute bottom-[-10rem] left-[-6rem] h-[26rem] w-[26rem] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-400/10" />
        </div>

        <Navbar />

        <div className="flex">
            <main
            className={[
                "flex-1 transition-[margin,filter] duration-300 ease-out",
                isOpen ? "lg:mr-96" : "",
            ].join(" ")}
            >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-[fadeUp_.25s_ease-out]">
                <Routes>
                <Route path="/sponsor" element={<SponsorPage />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                </div>
            </div>
            </main>

            <DetailsPanel />
        </div>

        <ToastContainer />
        </div>

      {/* Minimal keyframes (works even without extra libs) */}
        <style>{`
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
        }
        `}</style>
    </BrowserRouter>
    );
}

export default App;