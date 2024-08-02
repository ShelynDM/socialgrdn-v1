import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Search from './pages/Search';
import Profile from './pages/Profile';
import MapSearch from './pages/MapSearch';
import Listing from './pages/Listing';
import ForgotPassword from './pages/ForgotPassword';
import { useUserAuth } from './_utils/auth-context';
import VerifyEmail from './pages/VerifyEmail';
import ProtectedRoute from './pages/ProtectedRoute';

export default function App() {
  const { currentUser } = useUserAuth();

  //console.log('Current User:', currentUser);

  return (
    <Router>
      <Routes>
        {currentUser ? (
          <>
            <Route path="/" element={<Navigate to="/Search" />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/MapSearch" element={<ProtectedRoute><MapSearch /></ProtectedRoute>} />
            <Route path="/Listing" element={<ProtectedRoute><Listing /></ProtectedRoute>} />
            <Route path="/VerifyEmail" element={<VerifyEmail />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/LandingPage" />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/VerifyEmail" element={<VerifyEmail />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
