import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Navbar from './components/Navbar';
import BuildListPage from './pages/build/BuildListPage';
import BuildDetailPage from './pages/build/BuildDetailPage';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<BuildListPage />} />
                <Route path="/builds/:id" element={<BuildDetailPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
