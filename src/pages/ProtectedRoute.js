/**
 * ProtectedRoute.js
 * Description: This is a component that checks if a user is authenticated and has the correct role before rendering the children components.
 * Backend Author: Shelyn Del Mundo
 * Date: 2024-10-23
 */

import React, { useEffect, useState } from 'react';
import { auth } from '../_utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // This useEffect handles user authentication, email verification, and role fetching
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsVerified(user.emailVerified); // Check if the email is verified

        try 
        {
          // Fetch user role from the backend using email
          const response = await fetch(`/api/getUserRole?email=${user.email}`);

          if (!response.ok) {
              console.error('Error fetching user role:', response.statusText);
              return;
          }

          const data = await response.json();
          setUserRole(data.role); // Store the user's role in state
        } 
        catch (error) 
        {
            console.error('Error fetching user role:', error);
        }
      } 
      else {
        console.log('No user logged in');
        setLoading(false);
        return;
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // If the authentication or role fetching is still loading, display a loading indicator
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not verified, redirect them to the VerifyEmail page
  if (!isVerified) {
    console.log('Email not verified');
    return <Navigate to="/VerifyEmail" />;
  }

  // If the user's role is not in the allowed roles, redirect to the LandingPage
  if (!allowedRoles.includes(userRole)) {
    console.log('User does not have the required role');
    return <Navigate to="/RestrictedRoute" replace />;
  }

  // If everything is okay, render the children components
  return children;
};

export default ProtectedRoute;
