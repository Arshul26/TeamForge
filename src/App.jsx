// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from '../AuthPage'; // Import AuthPage from src folder
import Dashboard from './Dashboard'; // Import Dashboard from src folder

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
