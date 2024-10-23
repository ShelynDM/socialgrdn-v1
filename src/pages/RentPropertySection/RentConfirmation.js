import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"; //useLocation is used to extract rental_id from the query string

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import { LuMapPin } from "react-icons/lu";
import LongButton from "../../components/Buttons/longButton";
import zoneFormat from "../../components/ZoneColor/zoneColor";

import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";   //to be deleted


export default function RentConfirmation() {
    const navigate = useNavigate();

    // Extract the rental_id from the query string
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const rental_id = queryParams.get('rental_id');

    //Stores Rental Object Information
    const [rental, setRental] = useState('');

    const paymentStatus = 1; // 1 = Payment Successful, 0 = Payment Failed
    // Rental Information 

    const [propertyAddress, setPropertyAddress] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //Fetching Rent Details from API
    useEffect(() => {
        const fetchRentalDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/GetRentalDetails?rentalID=${rental_id}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                }
                const rentalData = await response.json();
                setRental(rentalData);
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
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchRentalDetails();

        //eslint - disable - next - line
    }, [rental_id]);

    //Updating Rent Details to DB
    useEffect(() => {
        if (!rental) {
            return;
        }
        const updatedRental = rental;
        updatedRental.status = 1;
        updatedRental.start_date = new Date(rental.start_date).toLocaleDateString('en-CA');
        updatedRental.end_date = new Date(rental.end_date).toLocaleDateString('en-CA');

        const patchRental = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/editRentalDetails`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedRental),
                    }
                );
                if (!response.ok) {
                    throw new Error('Failed to update rental data.');
                }
            } catch (error) {
                console.error('Error updating rental details:', error);
            }
        };

        patchRental();
        //eslint - disable - next - line
    }, [rental, rental_id]);


    const handleBackToReservations = () => {
        navigate('/ReservationList');
    };

    return (
        <div className='bg-main-background'>
            {/* Main Content */}
            <div className="flex flex-col items-center min-h-screen mx-4 pb-20  pt-20 bg-main-background">
                {/* Logo */}
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>

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
                                            <h1 className="font-bold text-lg ">{rental.property_name}</h1>
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
                                            <div className="w-4 h-4 border-1 border-gray-400" style={{ backgroundColor: zoneFormat(rental.growth_zone) }}></div>
                                            <p className="text-xs text-gray-500">Zone {rental.growth_zone}</p>
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

                        <LongButton buttonName='Back to Reservations'
                            onClick={handleBackToReservations}
                            className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold' />
                    </div>
                </div>


            </div>
            <NavBar SproutPath={GreenSprout} />

        </div>
    );
}