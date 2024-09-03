import React, { useState, useEffect } from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { SlArrowRight } from "react-icons/sl";
import { FaRegUser, FaRegUserCircle, FaPhone, FaUserTie, FaLock, FaUserCircle } from "react-icons/fa";
import { FaLocationDot, FaRegEnvelope } from "react-icons/fa6";
import { IoRibbonOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../_utils/firebase";

// This is the Profile page of the application where users can view and edit their profile information and log out
// User will be able to access the add listing page from here
export default function Profile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [userAddress, setUserAddress] = useState('');
    //const [userCity, setUserCity] = useState('');
    //const [userProvince, setUserProvince] = useState('');
    //const [userPostalCode, setUserPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const email = auth.currentUser.email;
    const [createdAt, setCreatedAt] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/profile?email=${email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();

                setFirstName(userData.first_name);
                setLastName(userData.last_name);
                setUsername(userData.username);
                setUserAddress(userData.address_line1);
                //setUserCity(userData.city);
                //setUserProvince(userData.province);
                //setUserPostalCode(userData.postal_code);
                setPhoneNumber(userData.phone_number);
                setProfession(userData.profession);

                // Convert the date to a more readable format
                const date = new Date(userData.created_at);

                // Format the date as 'Month Day, Year'
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                setCreatedAt(date.toLocaleDateString('en-US', options));
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, [email]);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            navigate("/SignIn"); // Redirect to SignIn page after logging out
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    const handleLandownerPage = () => {
        navigate("../PropertyLists"); // Redirect to Property List page
    }
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <BackButton />
                <FaUserCircle className="text-green-500 text-9xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2" />
                <div className="flex flex-col items-start justify-start">
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaRegUser className="text-2" />
                        <h1 className="text-lg ">{firstname} {lastname}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaRegUserCircle className="text-1" />
                        <h1 className="text-lg">{username}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaLocationDot className="text-1" />
                        <h1 className="text-lg">{userAddress}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaPhone className="text-1" />
                        <h1 className="text-lg">{phoneNumber}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaUserTie className="text-1" />
                        <h1 className="text-lg">{profession}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 ">
                        <FaLock className="text-1" />
                        <h1 className="text-lg">*******</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3">
                        <FaRegEnvelope className="text-1" />
                        <h1 className="text-lg">{email}</h1>
                    </div>
                    <div className="flex items-center space-x-4 p-3 mb-4">
                        <IoRibbonOutline className="text-1" />
                        <h1 className="text-lg">{createdAt}</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
                        <LongButton buttonName='Edit Profile'
                            onClick={() => alert('Edit Profile')}
                            className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold' />
                    </div>
                </div>

                <div className="flex items-center space-x-4 p-2 mb-2">
                    <GrMapLocation className="text-1" />
                    <button className="text-xl font-semibold" onClick={handleLandownerPage}>I am a landowner</button>
                    <SlArrowRight className="ml-auto text-xl" />
                </div>
                <div className="flex justify-center ">
                    <button className="text-red-500 text-lg font-extrabold" onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}