import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./client/components/Home";
import About from "./client/components/About";
import Login from "./client/components/Login";
import Admin from "./client/components/Admin";
import Sponsors from "./client/components/Sponsors";
import Contact from "./client/components/Contact";
import MensSquad from "./client/components/teams/MensSquad";

import './index.css';

const App = () => {

  const [isAuthenticated, setAuthenticated] = React.useState(
    Boolean(localStorage.getItem('loginEmail'))
  );

  console.log("What is coming here:::"+isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/menssquad" element={<MensSquad />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />
       {isAuthenticated ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

const root = document.getElementById('root');
const rootElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
const rootContainer = createRoot(root);
rootContainer.render(rootElement);
