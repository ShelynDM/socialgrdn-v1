/**
 * ViewMyListings.js
 * Description: Page for users to add a property listing
 * FrontEnd: Lilian Huh
  *BackEnd: Donald Uy
 * Date: 2024-10-23
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import LongButton from "../../components/Buttons/longButton";
import { useUser } from "../../UserContext";
import BackMoreButton from "../../components/Buttons/backMoreButton";

export default function ViewMyListings() {
    const [listings, setListings] = useState([]);
    const { userId } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch(`/api/getUserProperties?userID=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property listings');
                }

                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error('Error fetching property listings:', error);
            }
        };

        if (userId) {
            fetchListings();
        }
    }, [userId]);


    const formatAddress = (listing) => {
        const { address_line1, city, province, postal_code } = listing;
        return `${address_line1}, ${city}, ${province}, ${postal_code}`;
    };

    const handleViewClick = (propertyId) => {
        navigate(`/ViewMyProperty/${propertyId}`);
    };

    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <header className="p-4 flex items-center justify-between">
                <div className="p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background z-10">
                    <InAppLogo />
                </div>
            </header>
            <div>
                <BackMoreButton />
            </div>
            <div className="flex flex-col items-center justify-center flex-grow mx-4 px-6 ">
                <LongButton
                    buttonName="+ Add New Listing"
                    className="w-full rounded shadow-lg bg-green-500 text-black font-semibold"
                    pagePath="/AddProperty"
                /> 
            </div>
          
            <div className="flex flex-col items-center justify-center flex-grow mx-4 px-6 ">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-32">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-normal">You have {listings.length} listings</h1>
                    </div>

                    <div className="w-full space-y-4">
                        {listings.length > 0 ? (
                            listings.map((listing) => (
                                <div key={listing.property_id} className="flex items-center bg-white rounded-lg shadow-md p-4 relative">
                                    <img
                                        src={listing.image_url || 'https://via.placeholder.com/150'}
                                        alt={listing.property_name}
                                        className="w-72 h-32 object-cover rounded-lg mr-4"
                                    />
                                    <div className="flex flex-col justify-between h-full w-full">
                                        <div>
                                            <h2 className="text-lg font-semibold">{listing.property_name}</h2>
                                            <p className="text-sm text-gray-600">{formatAddress(listing) || 'No address available'}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleViewClick(listing.property_id)}
                                            className="mt-2 text-green-600 text-sm font-extrabold px-3 py-1 absolute bottom-4 right-4"
                                        >
                                            View
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>

            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}