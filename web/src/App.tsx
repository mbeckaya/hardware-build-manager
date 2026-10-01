import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Hello React</h1>} />
            </Routes>
        </BrowserRouter>
    );
}
