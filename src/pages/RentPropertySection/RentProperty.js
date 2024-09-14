import React, { useState, useEffect } from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import { IoArrowBackSharp } from "react-icons/io5";
import SearchBar from "../../components/SearchComponents/search";
import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";
import AgreeAndPay from "../../components/Buttons/longButton";
import { LuMapPin } from "react-icons/lu";

export default function RentProperty() {

    const [renter_ID, setRenter_ID] = useState('');

    //Property Information
    const [propertyID, setPropertyID] = useState('');
    const [propertyZone, setPropertyZone] = useState('');
    const [zoneColor] = useState("#00f");                         //FOR UPDATE
    const [propertyLocationID, setPropertyLocationID] = useState('');
    const [propertyName, setPropertyName] = useState('');

    //For Rental Table
    // const [renter_ID, setRenter_ID] = useState('');
    // const [start_date, setStart_date] = useState('');
    // const [end_date, setEnd_date] = useState('');
    // const [status, setStatus] = useState('');
    // const [rent_base_price, setRent_base_price] = useState('');
    // const [tax_amount, setTax_amount] = useState('');
    // const [total_price, setTotal_price] = useState('');
    // const [transaction_fee, setTransaction_fee] = useState('');

    setRenter_ID(4);
    setPropertyID(1);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/rentProperty?propertyID=${propertyID}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const propertyData = await response.json();

                setPropertyZone(propertyData.growth_zone);
                setPropertyName(propertyData.property_name);
                setPropertyLocationID(propertyData.location_id);
                // const date = new Date(userData.created_at);
                // const options = { year: 'numeric', month: 'long', day: 'numeric' };
                // setCreatedAt(date.toLocaleDateString('en-US', options));
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
        fetchPropertyDetails();
        // eslint-disable-next-line
    }, [propertyID]);

    console.log('Renter: ' + renter_ID);
    console.log('Property ID: ' + propertyID);
    console.log('Property zone: ' + propertyZone);
    console.log('Property location: ' + propertyLocationID);
    console.log('Property name: ' + propertyName);

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
                                <h1 className="font-bold text-lg ">John’s Yard</h1>
                            </div>
                        </div>
                        {/* Listing Description */}
                        <div className="flex flex-row justify-between">

                            {/* Listing Address */}
                            <div className="flex">
                                <LuMapPin />
                                <p className="text-xs">Address St, Calgary AB</p>
                            </div>
                            {/* Farming Zone */}
                            <div className="flex flex-row gap-1">
                                <div className="w-4 h-4 border-1 border-gray-400" style={{ backgroundColor: zoneColor }}></div>
                                <p className="text-xs text-gray-500">Zone 4A</p>
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
                            <p className="text-sm">September 1, 2024</p>
                            <p className="mx-1 text-sm"> - </p>
                            <p className="text-sm">September 30, 2024</p>
                        </div>
                        <div className="mx-4 flex">
                            <p className="text-sm w-20">Duration:</p>
                            <p className="text-sm">3 months</p>
                        </div>
                    </div>

                    {/* Price Description */}
                    <div className="mx-4">
                        <h2 className="font-semibold">Price Breakdown (CAD)</h2>
                        <div className="flex flex-col">
                            <div className="mx-4 flex justify-between">
                                <div className="flex">
                                    <p className="text-sm">Property Name</p>
                                    <p className="text-sm mx-1"> x </p>
                                    <p className="text-sm">7 months</p>
                                </div>
                                <p className="text-sm">240.00</p>
                            </div>
                            <div className="mx-4 flex justify-between">
                                <p className="text-sm">SocialGrdn Fee (3%)</p>
                                <p className="text-sm">7.20</p>
                            </div>
                            <div className="mx-4 flex justify-between">
                                <p className="text-sm">Tax</p>
                                <p className="text-sm">24.00</p>
                            </div>
                        </div>
                        <div className="mx-4 flex justify-between border-t border-t-black">
                            <h2 className="font-semibold">Total</h2>
                            <h2 className="font-semibold">271.20</h2>
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
                <AgreeAndPay
                    buttonName='Agree and Pay'
                    type='submit'
                    className='p-2 w-full rounded-lg bg-emerald-200'
                />
            </div>
            <NavBar SproutPath={GreenSprout} />

        </div>
    );
}