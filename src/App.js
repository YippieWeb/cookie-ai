import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Dashboard from "./pages/Dashboard"

function App() {
    return (
        <Router basename="/cookie-ai">
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
