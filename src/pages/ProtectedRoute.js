import React, { useEffect, useState } from 'react';
import { auth } from '../_utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isVerified, setIsVerified] = useState(false);
    const [needsProfile, setNeedsProfile] = useState(false);

    useEffect(() => {
        const checkUserProfile = async (email) => {
            try {
                const response = await fetch('http://localhost:3000/api/check-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setNeedsProfile(data.needsProfile); // Assuming the response has a needsProfile property
                } else {
                    console.error('Failed to check profile completion');
                    setNeedsProfile(true); // Default to needing profile if there's an error
                }
            } catch (error) {
                console.error('Error checking profile completion:', error);
                setNeedsProfile(true); // Default to needing profile if there's an error
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsVerified(user.emailVerified);
                if (user.emailVerified) {
                    // Check profile completion only if email is verified
                    checkUserProfile(user.email);
                } else {
                    setNeedsProfile(false);
                }
            } else {
                console.log('No user logged in');
                setNeedsProfile(false);
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
