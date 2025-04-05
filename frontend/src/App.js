import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import BusinessProfileForm from './pages/BusinessProfileForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/business-profile" element={<PrivateRoute><BusinessProfileForm /></PrivateRoute>
} />
    </Routes>
  </Router>
      </header>
    </div>
  );
}

export default App;
