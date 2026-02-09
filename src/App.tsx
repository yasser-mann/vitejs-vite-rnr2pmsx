import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // <--- Zidna 'Link' hna
import GuestGuide from './GuestGuide';
import Admin from './Admin';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Route Guests (Dynamic) */}
        <Route path="/guide/:slug" element={<GuestGuide />} />

        {/* Home Route (Redesigned) */}
        <Route
          path="/"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
              {/* Logo / Icon */}
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-4xl mb-6 border border-gray-100">
                🏠
              </div>
              
              {/* Titles */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
                Airbnb Guide Platform
              </h1>
              <p className="text-gray-500 text-lg mb-8 text-center max-w-md">
                Welcome to your digital guestbook manager.
              </p>

              {/* Login Button */}
              <Link
                to="/admin"
                className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white transition-all duration-200 bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-gray-800 hover:shadow-lg active:scale-95"
              >
                <span>Admin Login</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              
              {/* Footer text */}
              <p className="mt-12 text-sm text-gray-400 font-medium">
                © {new Date().getFullYear()} Guide App
              </p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;