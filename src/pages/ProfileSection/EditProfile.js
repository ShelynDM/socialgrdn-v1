import React, { useState, useEffect } from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { FaUserCircle } from "react-icons/fa";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import InputWithClearButton from "../../components/InputComponents/inputWithClearButton";
import { auth } from "../../_utils/firebase";
import { useNavigate } from 'react-router-dom';

// SweetAlert2 imports
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function EditProfile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const email = auth.currentUser ? auth.currentUser.email : '';
    
    const navigate = useNavigate();  // Initialize useNavigate for redirection

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (!email) {
                    console.error("No email found");
                    return;
                }
                const response = await fetch(`http://localhost:3000/api/profile?email=${email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
    
                setFirstName(userData.first_name || '');
                setLastName(userData.last_name || '');
                setUsername(userData.username || '');
                setUserAddress(userData.address_line1 || '');
                setPhoneNumber(userData.phone_number || '');
                setProfession(userData.profession || '');
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setIsLoading(false);
            }
        };
    
        fetchUserProfile();
    }, [email]);

    const handleSaveChanges = async () => {
        const userProfile = {
            first_name: firstname,
            last_name: lastname,
            username,
            address_line1: userAddress,
            phone_number: phoneNumber,
            profession,
            email
        };
    
        try {
            const response = await fetch(`/api/editProfile?email=${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userProfile),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error(`Failed to update profile. Status: ${response.status}, Message: ${errorMessage}`);
                throw new Error('Failed to update profile');
            }
    
            console.log('Profile updated successfully');
    
            // Use SweetAlert2 to show a modal and redirect
            MySwal.fire({
                title: 'Update Successful',
                text: 'Your profile has been updated.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00B761'
            }).then(() => {
                // Redirect to profile page after confirmation
                navigate('/profile');
            });

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <FaUserCircle className="text-green-500 text-9xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2" />
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8">
                        {/* Email field (Read-only and disabled) */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                disabled
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500"
                                readOnly
                            />
                        </div>
                        
                        {/* First Name field */}
                        <InputWithClearButton
                            type="text"
                            id="firstName"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Enter First Name"
                        />
                        
                        {/* Last Name field */}
                        <InputWithClearButton
                            type="text"
                            id="lastName"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Enter Last Name"
                        />
                        
                        {/* Username field */}
                        <InputWithClearButton
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Username"
                        />

                        {/* Profession field */}
                        <InputWithClearButton
                            type="text"
                            id="profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            placeholder="Enter Profession"
                        />
                        
                        {/* Phone Number field */}
                        <InputWithClearButton
                            type="tel"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter Phone Number"
                        />
                        
                        {/* Address field */}
                        <InputWithClearButton
                            type="text"
                            id="address"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            placeholder="Enter Address"
                        />
                        
                        {/* Save Changes Button */}
                        <LongButton
                            buttonName="Save Changes"
                            className="w-full rounded shadow-lg bg-green-500 text-black font-semibold"
                            onClick={handleSaveChanges}
                        />
                    </form>
                </div>
            </div>
            <NavBar ProfileColor="#00B761" SproutPath={Sprout} />
        </div>
    );
}
