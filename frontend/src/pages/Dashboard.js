import React from 'react';
import { getUser, logout } from '../auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-2">Welcome, {user?.name}</h2>
        <p className="text-gray-600 mb-6">Role: <strong>{user?.role}</strong></p>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
