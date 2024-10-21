import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// SignUp Section
import LandingPage from './pages/SignUpSection/LandingPage';
import SignUp from './pages/SignUpSection/SignUp';
import VerifyEmail from './pages/SignUpSection/VerifyEmail';

// SignIn Section
import SignIn from './pages/SignInSection/SignIn';
import ForgotPassword from './pages/SignInSection/ForgotPassword';

// Search Section
import Search from './pages/SearchSection/Search';
import MapSearch from './pages/SearchSection/MapSearch';

// Profile Section
import Profile from './pages/ProfileSection/Profile';
import EditProfile from './pages/ProfileSection/EditProfile';
import ViewProfile from './pages/ProfileSection/ViewProfile';

// Rent Property Section
import Listing from './pages/RentPropertySection/Listing';
import RentProperty from './pages/RentPropertySection/RentProperty';
import RentConfirmation from './pages/RentPropertySection/RentConfirmation';
import ViewProperty from './pages/RentPropertySection/ViewProperty';
import ViewMyProperty from './pages/RentPropertySection/ViewMyProperty';
import AddProperty from './pages/ListingSection/AddProperty';
import EditProperty from './pages/ListingSection/EditProperty';

// Listing Section
import PropertyLists from './pages/ListingSection/PropertyLists';
import DeletionConfirmation from './pages/ListingSection/DeletionConfirmation';
import ListingConfirmation from './pages/ListingSection/ListingConfirmation';
import ViewMyListings from './pages/ListingSection/ViewMyListings';

// Pay Property Section
import PayProperty from './pages/PayPropertySection/PayProperty';

// Reservation Pages Section
import ReservationCancelled from './pages/ReservationSection/ReservationCancelled';
import ReservationDetails from './pages/ReservationSection/ReservationDetails';
import ReservationList from './pages/ReservationSection/ReservationList';

// Landowner Gross Earnings Section
import GrossEarnings from './pages/LandownerEarnings/GrossEarnings';
import Payouts from './pages/LandownerEarnings/Payouts';

//Moderator Section
import ModeratorViewMonthlyReport from './pages/Moderator/ModeratorViewMonthlyReport';
import ModeratorViewAllUsers from './pages/Moderator/ModeratorViewAllUsers';
import ModeratorViewReport from './pages/Moderator/ModeratorViewReport';
import ModeratorViewProfile from './pages/Moderator/ModeratorViewProfile';

// Utility components
import ProtectedRoute from './pages/ProtectedRoute';
import { useUserAuth } from './_utils/auth-context';
import { UserProvider } from './UserContext'; // Import the UserProvider

//Payment Page
//import { loadStripe } from '@stripe/stripe-js';
//const stripePromise = loadStripe('pk_test_51Q2bKFLm0aJYZy9zjEVCE8j46DB65CeMLdzRbsgQHjZE7yhmpnehuGyaS9PRhaEywzngrxc94rich04HvQQQixU2007gqxkrhn'); // Initialize Stripe with your publishable key




export default function App() {
  const { currentUser } = useUserAuth();

  return (
    <UserProvider>
      <Router>
        <Routes>
          {currentUser ? (
            <>
              {/* Search Section */}
              <Route path="/" element={<Navigate to="/Search" />} />
              <Route path="/Search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/MapSearch" element={<ProtectedRoute><MapSearch /></ProtectedRoute>} />

              {/* Sign Up Section */}
              <Route path="/LandingPage" element={<LandingPage />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/VerifyEmail" element={<VerifyEmail />} />

              {/* Sign In Section */}
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />

              {/* Profile Section */}
              <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/EditProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
              <Route path="/ViewProfile" element={<ProtectedRoute><ViewProfile /></ProtectedRoute>} />

              {/* Rent Property Section */}
              <Route path="/Listing" element={<ProtectedRoute><Listing /></ProtectedRoute>} />
              <Route path="/RentProperty" element={<ProtectedRoute><RentProperty /></ProtectedRoute>} />
              <Route path="/RentConfirmation" element={<ProtectedRoute><RentConfirmation /></ProtectedRoute>} />
              <Route path="/ViewProperty" element={<ProtectedRoute><ViewProperty /></ProtectedRoute>} />

              {/* This route now dynamically receives the property_id as a URL param */}
              <Route path="/ViewMyProperty/:id" element={<ProtectedRoute><ViewMyProperty /></ProtectedRoute>} />

              {/* Listing Section */}
              <Route path="/PropertyLists" element={<ProtectedRoute><PropertyLists /></ProtectedRoute>} />
              <Route path="/DeletionConfirmation" element={<ProtectedRoute><DeletionConfirmation /></ProtectedRoute>} />
              <Route path="/ListingConfirmation" element={<ProtectedRoute><ListingConfirmation /></ProtectedRoute>} />
              <Route path="/ViewMyListings" element={<ProtectedRoute><ViewMyListings /></ProtectedRoute>} />
              <Route path="/AddProperty" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
              <Route path="/EditProperty" element={<ProtectedRoute><EditProperty /></ProtectedRoute>} />

              {/* Pay Property Section */}
              <Route path="/PayProperty" element={<ProtectedRoute><PayProperty /></ProtectedRoute>} />

              {/* Reservation Section */}
              <Route path="/ReservationCancelled" element={<ProtectedRoute><ReservationCancelled /></ProtectedRoute>} />
              <Route path="/ReservationDetails/:id" element={<ProtectedRoute><ReservationDetails /></ProtectedRoute>} />
              <Route path="/ReservationList" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />

              {/* Moderator Section */}
              <Route path="/ModeratorViewMonthlyReport" element={<ProtectedRoute><ModeratorViewMonthlyReport /></ProtectedRoute>} />
              <Route path="/ModeratorViewAllUsers" element={<ProtectedRoute><ModeratorViewAllUsers /></ProtectedRoute>} />
              <Route path="/ModeratorViewReport" element={<ProtectedRoute><ModeratorViewReport /></ProtectedRoute>} />
              <Route path="/ModeratorViewProfile" element={<ProtectedRoute><ModeratorViewProfile /></ProtectedRoute>} />



              {/* Landowner Gross Earnings Section */}
              <Route path="/GrossEarnings" element={<ProtectedRoute><GrossEarnings /></ProtectedRoute>} />
              <Route path="/Payouts" element={<ProtectedRoute><Payouts /></ProtectedRoute>} />
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
    </UserProvider>
  );
}
