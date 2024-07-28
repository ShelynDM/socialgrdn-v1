import React, { useEffect, useState } from 'react';
import { auth } from '../_utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [needsProfile, setNeedsProfile] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                //console.log('User logged in:', user);
                setIsVerified(user.emailVerified);
                setNeedsProfile(!user.displayName);
            } else {
                console.log('No user logged in');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isVerified) {
        console.log('Email not verified');
        return <Navigate to="/VerifyEmail" />;
    }

    if (needsProfile) {
        console.log('Profile needs to be completed');
        return <Navigate to="/Register" />;
    }

    return children;
};

export default ProtectedRoute;
