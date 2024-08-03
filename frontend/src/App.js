import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import Start from './pages/Start';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/start" element={<Start />} />

      </Routes>
    </Router>
  );
};

export default App;
