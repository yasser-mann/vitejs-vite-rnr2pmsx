import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GuestGuide from './GuestGuide';
import Admin from './Admin';
import Home from './Home'; // <--- 1. Importe la nouvelle page

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
          element={<Home />} 
        />
        {/* ^^^ 2. Remplace l'ancien div par <Home /> */}
      </Routes>
    </Router>
  );
};

export default App;