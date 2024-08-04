import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Start from './pages/Start';
import Onboarding1 from './pages/Onboarding1'
import Onboarding2 from './pages/Onboarding2'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start" element={<Start />} />
        <Route path="/onboarding1" element={<Onboarding1 />} />
        <Route path="/onboarding2" element={<Onboarding2 />} />

      </Routes>
    </Router>
  );
};

export default App;
