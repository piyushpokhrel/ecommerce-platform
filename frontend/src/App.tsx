import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { DetailsPanel } from './components/DetailsPanel';
import { ToastContainer } from './components/Toast';
import { Dashboard } from './pages/DashboardPage';
import { Projects } from './pages/Projects';
import { useDetailsPanelStore } from './store';


function App() {
const { isOpen } = useDetailsPanelStore();

return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        
        <div className="flex">
        <main className={`flex-1 transition-all duration-300 ${isOpen ? 'lg:mr-96' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
            </div>
        </main>

        <DetailsPanel />
        </div>

        <ToastContainer />
    </div>
    </BrowserRouter>
);
}

export default App;