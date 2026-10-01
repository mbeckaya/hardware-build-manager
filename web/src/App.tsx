import { BrowserRouter, Route, Routes } from 'react-router';
import BuildListPage from './pages/BuildListPage';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BuildListPage />} />
            </Routes>
        </BrowserRouter>
    );
}
