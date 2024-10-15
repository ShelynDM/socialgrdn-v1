"use client";
import React, { useState, useEffect } from "react";
import { FaUser, FaUserCircle, FaPhone, FaLock, FaRegEnvelope, FaUsers, FaUserTie } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { IoRibbonOutline } from "react-icons/io5";
import BackButton from "../../components/Buttons/backButton";
import { FaLocationDot } from "react-icons/fa6";
import LongButton from "../../components/Buttons/longButton";
import { TbReportAnalytics } from "react-icons/tb";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../_utils/firebase";
import { useUser } from "../../UserContext"; // Import useUser to get the userID

export default function ModeratorViewProfile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const { userId } = useUser(); // Get the userID from UserContext
    const email = auth.currentUser.email;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // Fetch user profile based on userID
                const response = await fetch(`/api/getProfile?userID=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();

                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setUsername(userData.username);
                setUserAddress(userData.address_line1);
                setPhoneNumber(userData.phone_number);
                setProfession(userData.profession);

                const date = new Date(userData.created_at);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                setCreatedAt(date.toLocaleDateString('en-US', options));
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (userId) {
            fetchUserProfile(); // Only fetch profile if userId exists
        }
    }, [userId]);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            navigate('/SignIn');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    const handleEditProfile = () => {
        navigate('/EditProfile');
    };

    const handleModeratorViewAllUsers = () => {
        navigate('/ModeratorViewAllUsers');
    };

    const handleModeratorViewReport = () => {
        navigate('/ModeratorViewReport');
    };

    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center flex-grow mt-6">
                <FaUserCircle className="text-green-500 text-9xl mb-4" />
                <div className="w-full px-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-24">
                    <div className="flex justify-center w-full">
                        <div className="flex flex-col items-center justify-center w-full ">
                            <div>
                                <div className="flex items-center justify-center space-x-4 p-2 mb-2 w-full">
                                    <h1 className="text-xl font-semibold">I am Admin</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaUser className="text-2xl" />
                                    <h1 className="text-lg">{firstname} {lastname}</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3">
                                    <FaLocationDot className="text-1" />
                                    {userAddress ? (
                                        <h1 className="text-lg">{userAddress}</h1>
                                    ) : (
                                        <h1 className="text-lg text-slate-600">Address</h1>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 p-3">
                                    <FaPhone className="text-1" />
                                    {phoneNumber ? (
                                        <h1 className="text-lg">{phoneNumber}</h1>
                                    ) : (
                                        <h1 className="text-lg text-slate-600">Phone Number</h1>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 p-3">
                                    <FaUserTie className="text-1" />
                                    {profession ? (
                                        <h1 className="text-lg">{profession}</h1>
                                    ) : (
                                        <h1 className="text-lg text-slate-600">Profession</h1>
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaLock className="text-1" />
                                    <h1 className="text-lg">*******</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3">
                                    <IoRibbonOutline className="text-1" />
                                    <h1 className="text-lg">{createdAt}</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 mb-4">
                                    <FaRegEnvelope className="text-1" />
                                    <h1 className="text-lg">{email}</h1>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
                                <LongButton
                                    buttonName='Edit Profile'
                                    onClick={handleEditProfile}
                                    className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold'
                                />
                            </div>
                            {/* View reports */}
                            <div className="flex flex-col items-center justify-center w-full mr-12">
                               
                                <div>
                                    <div className="flex items-center space-x-4 p-3 w-full" onClick={handleModeratorViewAllUsers}>
                                        <FaUsers className="text-2xl" />
                                        <button className="text-xl font-semibold">View all users</button>
                                        <SlArrowRight className="text-lg" />
                                    </div>
                                    <div className="flex items-center space-x-4 p-3 w-full" onClick={handleModeratorViewReport}>
                                        <TbReportAnalytics className="text-2xl" />
                                        <button className="text-xl font-semibold">View reports</button>
                                        <SlArrowRight className="text-lg ml-4" />
                                    </div>
                                    <div className="flex justify-center ">
                                        <button className="text-red-500 text-lg font-extrabold" onClick={handleLogOut}>Log Out</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}