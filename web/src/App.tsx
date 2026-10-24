import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Navbar from './components/Navbar';
import BuildListPage from './pages/build/BuildListPage';
import BuildDetailPage from './pages/build/BuildDetailPage';
import BuildEditPage from './pages/build/BuildEditPage';
import BuildCreatePage from './pages/build/BuildCreatePage';

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<BuildListPage />} />
                <Route path="/builds/:id" element={<BuildDetailPage />} />
                <Route path="/builds/:id/edit" element={<BuildEditPage />} />
                <Route path="/builds/new" element={<BuildCreatePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
