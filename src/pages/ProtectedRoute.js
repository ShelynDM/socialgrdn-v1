import React, { useEffect, useState } from 'react';
import { auth } from '../_utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

// This component is a protected route that checks if the user is authenticated and has a verified
const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);

    // This component will check if the user verified their email
    useEffect(() => {

        // This function will check if the user is authenticated and has a verified email
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsVerified(user.emailVerified);
            } else {
                console.log('No user logged in');
                return <Navigate to="/Login" />;
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // If the user is not authenticated, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If the user is not verified, redirect them to the VerifyEmail page
    if (!isVerified) {
        console.log('Email not verified');
        return <Navigate to="/VerifyEmail" />;
    }



    return children;
};

export default ProtectedRoute;