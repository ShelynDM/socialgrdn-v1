import React from "react";
import { FaUser, FaUserCircle, FaUserTie } from "react-icons/fa";
import { IoRibbonOutline } from "react-icons/io5";
import InAppLogo from "../components/inAppLogo";
import BackButton from "../components/backButton";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import { FaLocationDot } from "react-icons/fa6";

// Hardcoded data for listings
const listings = [
    {
        id: 1,
        image: 'https://via.placeholder.com/150',
        name: 'Property 1',
        address: '123 Main St, Calgary, AB',
        crop: 'Wheat',
        size: '15 x 15 ft',
    },
    {
        id: 2,
        image: 'https://via.placeholder.com/150',
        name: 'Property 2',
        address: '456 Elm St, Calgary, AB',
        crop: 'Corn',
        size: '15 x 15 ft',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/150',
        name: 'Property 3',
        address: '789 Oak St, Calgary, AB',
        crop: 'Soybean',
        size: '15 x 15 ft',
    },
];

export default function ViewProfile() {
    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center flex-grow">
                <FaUserCircle className="text-green-500 text-9xl mb-4" />
                <div className="w-full px-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-24">
                    <div className="flex justify-center">
                        <div className="flex flex-col items-start justify-start">
                            <div className="flex items-center space-x-4 p-3">
                                <FaUser className="text-2xl" />
                                <h1 className="text-lg">Gordon Ramsay</h1>
                            </div>
                            <div className="flex items-center space-x-4 p-3">
                                <FaUserCircle className="text-2xl" />
                                <h1 className="text-lg">Gramsey</h1>
                            </div>
                            <div className="flex items-center space-x-4 p-3">
                                <FaLocationDot className="text-2xl" />
                                <h1 className="text-lg">Calgary, AB</h1>
                            </div>
                            <div className="flex items-center space-x-4 p-3">
                                <FaUserTie className="text-2xl" />
                                <h1 className="text-lg">TV Host</h1>
                            </div>
                            <div className="flex items-center space-x-4 p-3">
                                <IoRibbonOutline className="text-2xl" />
                                <h1 className="text-lg">04/02/2020</h1>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-xl font-bold">Gramsey's Listings</h1>
                    </div>
                    <div className="flex overflow-x-scroll space-x-4 mt-4">
                        {listings.map((listing) => (
                            <div key={listing.id} className="w-64 flex-shrink-0 bg-white rounded-lg shadow-lg p-4 relative">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-semibold">{listing.name}</h2>
                                    <button className="text-sm font-bold text-green-600 py-1 px-2">View</button>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{listing.address}</p>
                                <img src={listing.image} alt={listing.name} className="w-full h-32 object-cover rounded-md mb-2" />
                                <div className="text-sm text-gray-700 flex justify-between">
                                    <p><strong>Crop:</strong> {listing.crop}</p>
                                    <p><strong>Size:</strong> {listing.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
