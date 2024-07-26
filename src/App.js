import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import Profile from './pages/Profile';
import MapSearch from './pages/MapSearch';
import Listing from './pages/Listing';


export default function App() {
    return (
      <Router>
        <Routes>
          {/* Redirect to landing page by default */}
          <Route path="/" element={<Navigate to="/LandingPage" />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/MapSearch" element={<MapSearch />} />
          <Route path="/Listing" element={<Listing />} />
        </Routes>
      </Router>
    );
}
