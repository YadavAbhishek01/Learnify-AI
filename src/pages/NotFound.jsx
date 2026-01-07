// src/pages/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Main 404 Illustration */}
        <div className="relative mx-auto mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-red-400 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto mb-6 transform rotate-6 hover:rotate-0 transition-transform duration-300">
            <span className="text-5xl">🔍</span>
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
            <span className="text-xl">❌</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-black text-gray-900 mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Page Not Found
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            ← Go Back
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            Go Home
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-12">
          Error Code: 404 | Page not found
        </p>
      </div>
    </div>
  );
};

export default NotFound;
