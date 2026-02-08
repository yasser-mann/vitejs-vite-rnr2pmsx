import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

        {/* Home Route */}
        <Route
          path="/"
          element={
            <div className="p-10 text-center text-xl font-bold">
              Welcome to Airbnb Guide Platform 🏠
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
