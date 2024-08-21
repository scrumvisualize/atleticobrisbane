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
import U16Squad from "./client/components/teams/U16Squad";
import U12Squad from "./client/components/teams/U12Squad";
import TeamDistribution from "./client/components/teams/TeamDistribution";
import Schedule from "./client/components/Schedule";
import MasterSquad from "./client/components/teams/MasterSquad";
import TopBanner from "./client/components/TopBanner";
import MainNavbar from "./client/components/MainNavbar";
import TeamTokenGenerator from './client/components/TeamTokenGenerator';
import PageNotFound from './client/components/PageNotFound';
import InactivityLogout from './client/components/InactivityLogout';
import ResetPassword from './client/components/ResetPassword';

import './index.css';

const App = () => {

  const [isAuthenticated, setAuthenticated] = React.useState(
    Boolean(localStorage.getItem('loginEmail'))
  );
  const [displayName, setDisplayName] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  console.log("Auth status after successful login:::"+isAuthenticated);

  useEffect(() => {
    const storedDisplayName = localStorage.getItem('displayName');
    if (storedDisplayName) {
        setDisplayName(storedDisplayName);
    }
}, []);

  return (
    <Router>
      <TopBanner displayName={displayName} setDarkMode={setDarkMode} isAuthenticated={isAuthenticated}/>
      <MainNavbar isAuthenticated={isAuthenticated} setAuthenticated={setAuthenticated} />
      {isAuthenticated && <InactivityLogout setAuthenticated={setAuthenticated} />}
      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/about" element={<About />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/menssquad" element={<MensSquad />} />
        <Route path="/u16squad" element={<U16Squad />} />
        <Route path="/u12squad" element={<U12Squad />} />
        <Route path="/mastersquad" element={<MasterSquad />} />
        <Route path="/teamdistribution" element={<TeamDistribution />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/teamtokengenerator" element={<TeamTokenGenerator />} />
        <Route path="/resetPassword" element={<ResetPassword/>} />
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
