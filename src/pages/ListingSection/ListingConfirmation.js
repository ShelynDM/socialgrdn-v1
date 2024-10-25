/**
 * ListingConfirmation.js
 * Description: Page displays a confirmation message for a property listing and fetches the listing status from the API.
 * Author: Lilian Huh
 * Date: 2024-10-23
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../UserContext";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import BackMoreButton from "../../components/Buttons/backMoreButton";

export default function ListingConfirmation() {
    const navigate = useNavigate();
    const { userID } = useUser();
    const [message, setMessage] = useState(null);
    const [property_name, setPropertyName] = useState(null);

    // Function to navigate to the ViewMyListings page
    const handleViewMyListings = () => {
        navigate('/ViewMyListings');
    };

    // Fetch the property status once the component mounts
    useEffect(() => {
        const fetchStatus = async () => {
            const hardCodedPropertyID = 6;
            try {
                console.log('Fetching property status for property ID:', hardCodedPropertyID); // Log the request initiation
                
                const response = await fetch(`/api/getPropStatus?property_id=${hardCodedPropertyID}`);
                const data = await response.json();

                console.log('Response data:', data); // Log the API response data

                if (response.ok) {
                    // Check the property status and set the message accordingly
                    if (data.status === "1") {
                        console.log('Property is active');
                        setMessage('Thank you for listing your property!');
                        setPropertyName(data.property_name);
                    } else {
                        console.log('Property is not active');
                        setMessage('Your property listing is not active.');
                    }
                } else {
                    console.error('Error response from API:', response.status); // Log the error response code
                    setMessage('Error fetching property details.');
                }
            } catch (error) {
                console.error('Fetch error:', error); // Log the error if fetch fails
                setMessage('An error occurred while fetching property details.');
            }
        };

        fetchStatus();
    }, []);

    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackMoreButton />
            <div className="flex flex-col items-center justify-center gap-4 flex-grow pb-20">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-28">
                    <div className="mb-6 text-center">
                        <h1 className="text-2xl font-semibold">{message}</h1>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <h2 className="text-lg font-medium">
                            {property_name} is under your listings page.
                        </h2>
                    </div>

                    <div className="flex justify-center mt-8" onClick={handleViewMyListings}>
                        <button 
                            className="text-green-600 font-bold hover:font-extrabold"
                            aria-label="Back to my listings"
                        >
                            Back to my listings
                        </button>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
