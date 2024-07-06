import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./client/components/Home";
import About from "./client/components/About";
import Login from "./client/components/Login";
import Admin from "./client/components/Admin";
import Sponsors from "./client/components/Sponsors";
import Contact from "./client/components/Contact";
import MensSquad from "./client/components/teams/MensSquad";
import MasterSquad from "./client/components/teams/MasterSquad";
import TopBanner from "./client/components/TopBanner";
import MainNavbar from "./client/components/MainNavbar";
import PageNotFound from './client/components/PageNotFound';
import InactivityLogout from './client/components/InactivityLogout';

import './index.css';

const App = () => {

  const [isAuthenticated, setAuthenticated] = React.useState(
    Boolean(localStorage.getItem('loginEmail'))
  );
  const [displayName, setDisplayName] = useState("");

  console.log("What is auth status here:::"+isAuthenticated);

  useEffect(() => {
    const storedDisplayName = localStorage.getItem('displayName');
    if (storedDisplayName) {
        setDisplayName(storedDisplayName);
    }
}, []);

  return (
    <Router>
      <TopBanner displayName={displayName}/>
      <MainNavbar isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
      {isAuthenticated && <InactivityLogout setAuthenticated={setAuthenticated} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/menssquad" element={<MensSquad />} />
        <Route path="/mastersquad" element={<MasterSquad />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} setDisplayName={setDisplayName} />}
        />
       {isAuthenticated ? (
          <Route path="/admin" element={<Admin />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/login" />} />
        )}
         <Route path="*" element={<PageNotFound />} />
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
