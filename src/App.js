import { HashRouter, Route, Routes } from 'react-router-dom'; // for github pages
import './App.css';
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <HashRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </HashRouter>
  );
}

export default App;