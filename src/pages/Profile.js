import React,{useState} from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import { SlArrowRight } from "react-icons/sl";
import { FaRegUser, FaRegUserCircle, FaPhone, FaUserTie, FaLock, FaUserCircle } from "react-icons/fa";
import { FaLocationDot, FaRegEnvelope } from "react-icons/fa6";
import { IoRibbonOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import LongButton from "../components/longButton";
import BackButton from "../components/backButton";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../_utils/firebase";



export default function Profile() {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userProvince, setUserProvince] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profession, setProfession] = useState('');
    const [email, setEmail] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    const navigate = useNavigate();

    
    


    const handleLogOut = async () => {
        try {
            await signOut(auth);
            navigate("/SignIn"); // Redirect to SignIn page after logging out
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
            <BackButton/>
            <FaUserCircle className="text-green-500 text-9xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2" />
            <div className="flex flex-col items-start justify-start">
                <div className="flex items-center space-x-4 p-3 ">
                    <FaRegUser className="text-2" />
                    <h1 className="text-lg ">{firstname} {lastname}</h1>
                </div>
                <div className="flex items-center space-x-4 p-3">
                    <FaRegUserCircle className="text-1" />
                    <h1 className="text-lg">james10</h1>
                </div>
                <div className="flex items-center space-x-4 p-3">
                    <FaLocationDot className="text-1" />
                    <h1 className="text-lg">123 Sait Calgary</h1>
                </div>
                <div className="flex items-center space-x-4 p-3 ">
                    <FaPhone className="text-1" />
                    <h1 className="text-lg">403 123 4567</h1>
                </div>
                <div className="flex items-center space-x-4 p-3">
                    <FaUserTie className="text-1" />
                    <h1 className="text-lg">Lawyer</h1>
                </div>
                <div className="flex items-center space-x-4 p-3 ">
                    <FaLock className="text-1" />
                    <h1 className="text-lg">*******</h1>
                </div>
                <div className="flex items-center space-x-4 p-3">
                    <FaRegEnvelope className="text-1" />
                    <h1 className="text-lg">{auth.currentUser.email}</h1>
                </div>
                <div className="flex items-center space-x-4 p-3 mb-4">
                    <IoRibbonOutline className="text-1" />
                    <h1 className="text-lg">{auth.currentUser.cre}</h1>
                </div>
                <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
              <LongButton buttonName='Edit Profile' 
                onClick={() => alert('Edit Profile')}
                className='p-2 w-full  rounded shadow-lg bg-green-600 text-white font-bold' />
            </div>
            </div>

            <div className="flex items-center space-x-4 p-2  mb-2">
                <GrMapLocation className="text-1" />
                <button className="text-xl font-semibold">I am a landowner</button>
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