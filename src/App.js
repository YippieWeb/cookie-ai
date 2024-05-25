import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for github pages
import './App.css';
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;