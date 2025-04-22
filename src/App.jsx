import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Update the paths accordingly
import HackathonExplorer from './pages/HackathonExplorer';
import HackathonDetails from './pages/HackathonDetails';
import ProfileDashboard from './pages/ProfileDashboard'; // Remove the duplicate import
import AuthPage from './AuthPage'; // Assuming you have a LoginPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hackathon-explorer" element={<HackathonExplorer />} />
        <Route path="/hackathon-details/:id" element={<HackathonDetails />} />
        <Route path="/profile" element={<ProfileDashboard />} />
        <Route path="/" element={<AuthPage />} /> {/* Default route for login */}
      </Routes>
    </Router>
  );
}

export default App;
