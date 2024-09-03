import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import LongButton from "../components/longButton";
import BackMoreButton from "../components/backMoreButton";

// Hardcoded data for listings
const listings = [
    { id: 1, image: 'https://via.placeholder.com/150', name: 'Property 1', address: '123 Main St, Calgary, AB' },
    { id: 2, image: 'https://via.placeholder.com/150', name: 'Property 2', address: '456 Elm St, Calgary, AB' },
    { id: 3, image: 'https://via.placeholder.com/150', name: 'Property 3', address: '789 Oak St, Calgary, AB' },
];

export default function ViewMyListings() {
    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackMoreButton />
            <div className="flex flex-col items-center justify-center flex-grow ">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-32">
                    <LongButton buttonName="+ Add New Listing" className="w-full rounded shadow-lg bg-green-500 text-black font-semibold mb-6 mt-6" pagePath="/EditListing" />
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-normal">You have 3 listings</h1>
                    </div>

                    {/* Listings */}
                    <div className="w-full space-y-4">
                        {listings.map((listing) => (
                            <div key={listing.id} className="flex items-center bg-white rounded-lg shadow-md p-4 relative">
                                <img src={listing.image} alt={listing.name} className="w-72 h-32 object-cover rounded-lg mr-4" />
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <h2 className="text-lg font-semibold">{listing.name}</h2>
                                        <p className="text-sm text-gray-600">{listing.address}</p>
                                    </div>
                                    <button className="mt-2 text-green-600 text-sm font-extrabold px-3 py-1 absolute bottom-4 right-4">
                                        View
                                    </button>
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
