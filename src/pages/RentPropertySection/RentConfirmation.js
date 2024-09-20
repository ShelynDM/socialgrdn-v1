import React, { useState } from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import { IoArrowBackSharp } from "react-icons/io5";
import SearchBar from "../../components/SearchComponents/search";
import ExampleImage from "../../assets/exampleAssets/imgExample.jpg";
import { LuMapPin } from "react-icons/lu";





export default function RentConfirmation() {
    const [zoneColor] = useState("#00f");
    const [paymentStatus] = useState(0);


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
                {/* Checks if payment was successful */}
                {paymentStatus === 0 ?
                    //If payment was successful
                    <div className="w-96 rounded-lg border-2 py-1 border-gray-200 bg-main-background">
                        <h1 className="font-semibold text-2xl mx-4">Payment Failed</h1>
                    </div> :
                    //If payment was not successful
                    <div>

                    </div>
                }

                {/* Rent Information */}
                <div className="w-96 rounded-lg border-2 py-1 border-gray-200 bg-main-background">
                    <h1 className="font-semibold text-2xl mx-4">Booking Confirmed</h1>
                    {/* Listing Duration */}
                    <div className="mx-4 flex">
                        <p className="text-sm">September 1, 2024</p>
                        <p className="mx-1 text-sm"> - </p>
                        <p className="text-sm">September 30, 2024</p>
                    </div>
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
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />

        </div>
    );
}