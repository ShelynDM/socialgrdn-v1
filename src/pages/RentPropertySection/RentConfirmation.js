import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
//import { IoArrowBackSharp } from "react-icons/io5";
//import SearchBar from "../../components/SearchComponents/search";
import { LuMapPin } from "react-icons/lu";
import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";   //to be deleted

import zoneFormat from "../../components/ZoneColor/zoneColor";


export default function RentConfirmation() {
    const navigate = useNavigate();
    const [paymentStatus] = useState(1);  //passed as parameter from view property page
    const [rental_id] = useState(1);      //passed as parameter from view property page
    // Rental Information 
    const [propertyZone, setPropertyZone] = useState('');
    const [zoneColor, setZoneColor] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [propertyName, setPropertyName] = useState('');
    //property name, address
    //const { renter_ID } = useUser(); // Get the userID from UserContext
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //Fetching Rent Details from API
    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/GetRentalDetails?rental_id=${rental_id}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                }
                const rentalData = await response.json();

                // Convert timestamps to 'Month Day, Year' format
                const formattedStartDate = new Date(rentalData.start_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                });
                const formattedEndDate = new Date(rentalData.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });

                setPropertyAddress(rentalData.address_line1 + ', ' + rentalData.city + ', ' + rentalData.province);
                setPropertyZone(rentalData.growth_zone);
                setPropertyName(rentalData.property_name);
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
        fetchRentalDetails();
        //eslint - disable - next - line
    }, [rental_id]);

    //setZoneColor
    const assignZoneColor = (zone) => {
        setZoneColor(zoneFormat(zone));
    };

    const handleBackToReservations = () => {
        navigate('/Reservations');
    };

    useEffect(() => {
        assignZoneColor(propertyZone);
        //eslint-disable-next-line
    }, [propertyZone]);


    return (

        <div className='bg-main-background'>
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen mx-4 pb-20 bg-main-background">
                {/* Logo */}
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>

                {/* Top Bar Section (Back Button, Search, Filter) */}
                {/* <div className="flex items-center justify-between fixed top-0 left-0 right-0 mt-10 px-4 bg-main-background">
                    <button>
                        <IoArrowBackSharp size={25} />
                    </button>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div> */}
                <div className="w-96 h-5/6 rounded-lg border-2 py-1 border-gray-200 bg-main-background">
                    {/* Checks if payment was successful */}
                    {paymentStatus === 0 ?
                        //If payment was not successful
                        <div className="">
                            <h1 className="font-semibold text-2xl mx-4">Payment Failed</h1>
                        </div>
                        :
                        //Payment successful start
                        <div>
                            {/* Rent Information */}
                            <div className="">
                                <h1 className="font-semibold text-2xl mx-4">Booking# {rental_id} is Confirmed</h1>
                                {/* Listing Duration */}
                                <div className="mx-4 flex">
                                    <p className="text-sm">{startDate}</p>
                                    <p className="mx-1 text-sm"> - </p>
                                    <p className="text-sm">{endDate}</p>
                                </div>
                                <div className="px-6 pt-2">
                                    {/* Listing Title */}
                                    <div className="flex flex-row justify-between mb-2">
                                        <div>
                                            <h1 className="font-bold text-lg ">{propertyName}</h1>
                                        </div>
                                    </div>
                                    {/* Listing Description */}
                                    <div className="flex flex-row justify-between">

                                        {/* Listing Address */}
                                        <div className="flex">
                                            <LuMapPin />
                                            <p className="text-xs">{propertyAddress}</p>
                                        </div>
                                        {/* Farming Zone */}
                                        <div className="flex flex-row gap-1">
                                            <div className="w-4 h-4 border-1 border-gray-400" style={{ backgroundColor: zoneColor }}></div>
                                            <p className="text-xs text-gray-500">Zone {propertyZone}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Listing Image */}
                                <div className="w-auto h-52 flex justify-center items-center mx-4 p-1">
                                    <img className="w-full h-full rounded-lg border-2 border-gray-200" src={ExampleImage} alt="Garden" />
                                </div>
                            </div>
                        </div>//Payment successful end
                    }
                    <div className="self-center p-5">
                        <p className="text-green-600 text-base font-bold text-center cursor-pointer" onClick={handleBackToReservations}>Back to Reservation</p>
                    </div>
                </div>


            </div>
            <NavBar SproutPath={GreenSprout} />

        </div>
    );
}