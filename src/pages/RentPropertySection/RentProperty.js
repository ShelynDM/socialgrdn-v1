import React, { useEffect, useState } from "react";
import { differenceInMonths, differenceInDays, parseISO } from 'date-fns';
import { useParams } from 'react-router-dom';

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import { IoArrowBackSharp } from "react-icons/io5";
import SearchBar from "../../components/SearchComponents/search";
import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";
import AgreeAndPay from "../../components/Buttons/longButton";
import { LuMapPin } from "react-icons/lu";
import zoneColor from "../../components/ZoneColor/zoneColor";

import { useUser } from "../../UserContext";

export default function RentProperty() {
    //const propertyID = useParams().id;            //parameter
    const [propertyID] = useState(1);               //FOR Deletion
    const { userId } = useUser();

    //Stores Property Object Information
    const [property, setProperty] = useState('');

    // Rental Information 
    const [startDate] = useState('2024-09-01');                   //passed as parameter from view property page
    const [endDate] = useState('2024-12-05');                     //passed as parameter from view property page
    const [durationMonths, setDurationMonths] = useState(null);   // need to finalize issues with duration rules and pricing
    const [durationDays, setDurationDays] = useState(null);       //need to finalize issues with duration rules and pricing

    const [rent_base_price, setRent_base_price] = useState(0.00);
    const [tax_amount, setTax_amount] = useState(0.00);
    const [transaction_fee, setTransaction_fee] = useState(0.00);
    const [total_price, setTotal_price] = useState(0.00);


    //Fetching Property Details from API
    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getPropertyDetails?property_id=${propertyID}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                }
                const propertyData = await response.json();
                setProperty(propertyData);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };


        fetchPropertyDetails();
        //eslint - disable - next - line
    }, [propertyID]);

    // Calculate the duration of the rental
    const computeDuration = () => {
        if (startDate && endDate) {
            const start = parseISO(startDate);
            const end = parseISO(endDate);

            // Calculate the number of complete months between the dates
            const months = differenceInMonths(end, start);

            // Calculate the number of days remaining after accounting for complete months
            const days = differenceInDays(end, new Date(start.getFullYear(), start.getMonth() + months, start.getDate()));

            setDurationMonths(months);
            setDurationDays(days);
        }
    };

    // Get the current location of the user
    const computePrice = () => {
        console.log('Property Price is set');
        // Use propertyPrice directly for calculations
        const basePrice = parseFloat(property.rent_base_price) * durationMonths;
        const taxAmount = basePrice * 0.13;          // 13% tax
        const transactionFee = basePrice * 0.03;     // 3% transaction fee
        const totalPrice = basePrice + taxAmount + transactionFee;

        // Format the prices to 2 decimal places
        setRent_base_price(basePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTax_amount(taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTransaction_fee(transactionFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        setTotal_price(totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    };

    useEffect(() => {
        computeDuration();
        computePrice();
        //eslint-disable-next-line
    }, [property]);



    const handlePaymentPage = async () => {
        const form = document.getElementById('paymentForm');

        const basePrice = 100.00;
        const taxAmount = basePrice * 0.13;          // 13% tax
        const transactionFee = basePrice * 0.03;     // 3% transaction fee
        const totalPrice = basePrice + taxAmount + transactionFee;

        //Preparing rental object for DB registration
        const rental = {
            property_id: propertyID,
            renter_ID: userId,
            start_date: startDate,
            end_date: endDate,
            status: 0,                         // pending state, unpaid
            rent_base_price: basePrice,
            tax_amount: taxAmount,
            transaction_fee: transactionFee
        };

        console.log(rental);

        // Register rental details to the database and get the rentalID
        const rentalID = await handleRentalRegistration(rental);

        //Going to payment page
        const reservationDetails = "Reservation ID: " + rentalID;
        form.action = `http://localhost:3001/api/create-checkout-session?amount=${totalPrice * 100}&reservationDetails=${reservationDetails}`;
        form.submit();
    };


    // Register rental details to the database
    const handleRentalRegistration = async (rentalData) => {
        try {
            const response = await fetch('http://localhost:3000/api/registerRentalDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rentalData),  // Convert data to JSON format
            });

            if (response.ok) {
                const result = await response.json();  // Parse the response as JSON
                console.log('Rental registration successful:', result);
                return result.rentalID;  // Return the rentalID from the server response
            } else {
                console.error('Failed to register rental:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error occurred during rental registration:', error);
            return null;
        }
    };

    return (
        <div className='bg-main-background'>
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen mx-4 pb-20 bg-main-background">
                {/* Logo */}
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>

                {/* Top Bar Section (Back Button, Search, Filter) */}
                <div className="flex items-center justify-between fixed top-0 left-0 right-0 mt-10 px-4 bg-main-background">
                    <button>
                        <IoArrowBackSharp size={25} />
                    </button>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div>

                {/* Rent Information */}
                <div className="w-96 rounded-lg border-2 py-1 border-gray-200 bg-main-background">
                    <div className="px-6 pt-2">
                        {/* Listing Title */}
                        <div className="flex flex-row justify-between mb-2">
                            <div>
                                <h1 className="font-bold text-lg ">{property.property_name}</h1>
                            </div>
                        </div>
                        {/* Listing Description */}
                        <div className="flex flex-row justify-between">

                            {/* Listing Address */}
                            <div className="flex">
                                <LuMapPin />
                                <p className="text-xs">{property.address_line1 + ', ' + property.city + ', ' + property.province}</p>
                            </div>
                            {/* Farming Zone */}
                            <div className="flex flex-row gap-1">
                                <div className="w-4 h-4 border-1 border-gray-400" style={{ backgroundColor: zoneColor(property.growth_zone) }}></div>
                                <p className="text-xs text-gray-500">Zone {property.growth_zone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Listing Image */}
                    <div className="w-auto h-52 flex justify-center items-center mx-4 p-1">
                        <img className="w-full h-full rounded-lg border-2 border-gray-200" src={ExampleImage} alt="Garden" />
                    </div>

                    {/* Listing Duration */}
                    <div className="flex flex-col">
                        <div className="mx-4 flex">
                            <p className="text-sm w-20">Date:</p>
                            <p className="text-sm">{startDate}</p>
                            <p className="mx-1 text-sm"> - </p>
                            <p className="text-sm">{endDate}</p>
                        </div>
                        <div className="mx-4 flex">
                            <p className="text-sm w-20">Duration:</p>
                            <p className="text-sm">{durationMonths} Months {durationDays} Days</p>
                        </div>
                    </div>

                    {/* Price Description */}
                    <div className="mx-4">
                        <h2 className="font-semibold">Price Breakdown (CAD)</h2>
                        <div className="flex flex-col">
                            <div className="mx-4 flex justify-between">
                                <div className="flex">
                                    <p className="text-sm">{property.property_name}</p>
                                    <p className="text-sm mx-1"> x </p>
                                    <p className="text-sm">{durationMonths} months</p>
                                </div>
                                {/* <p className="text-sm">rent_base_price</p> */}
                                <p className="text-sm">{rent_base_price}</p>
                            </div>
                            <div className="mx-4 flex justify-between">
                                <p className="text-sm">SocialGrdn Fee (3%)</p>
                                {/* <p className="text-sm">transaction_fee</p> */}
                                <p className="text-sm">{transaction_fee}</p>
                            </div>
                            <div className="mx-4 flex justify-between">
                                <p className="text-sm">Tax</p>
                                {/* <p className="text-sm">tax_amount</p> */}
                                <p className="text-sm">{tax_amount}</p>
                            </div>
                        </div>
                        <div className="mx-4 flex justify-between border-t border-t-black">
                            <h2 className="font-semibold">Total</h2>
                            {/* <h2 className="font-semibold">total_price</h2> */}
                            <h2 className="font-semibold">{total_price}</h2>
                        </div>

                        <div className="my-2">
                            <h2 className="font-semibold text-sm">Cancellation Policy</h2>
                            <p className="text-xs">Cancellation permitted 30 days from the start of reservation date.</p>
                        </div>
                    </div>
                </div>
                <div className="mx-4 my-2 text-center text-xs">
                    <p>By continuing with this booking, I agree to SocialGrdn's Terms of use and Privacy Policy</p>
                </div>
                {/* //redirecting to payment page */}
                <form id="paymentForm" method="POST">
                    <AgreeAndPay
                        buttonName='Agree and Pay'
                        type='submit'
                        className='p-2 w-full rounded-lg bg-emerald-200'
                        onClick={handlePaymentPage}
                    />
                </form>
            </div>
            <NavBar SproutPath={GreenSprout} />

        </div>
    );
}