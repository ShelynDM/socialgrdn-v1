import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import BackMoreButton from "../../components/Buttons/backMoreButton";
import { useUser } from "../../UserContext";

export default function ListingConfirmation() {
    const { userId } = useUser();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const handleViewMyListings = () => {
        navigate('/ViewMyListings');
    };

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            const hardCodedPropertyId = '6'; // Replace this with the actual property ID for testing
            try {
                const response = await fetch(`/api/GetPropertyDetailsAPI?property_id=${hardCodedPropertyId}`);
                const data = await response.json();

                if (response.ok) {
                    // Check the property status and set the message accordingly
                    if (data.status === 1) {
                        setMessage('Thank you for listing your property!');
                    } else {
                        setMessage('Your property listing is not active.');
                    }
                } else {
                    setMessage('Error fetching property details.');
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setMessage('An error occurred while fetching property details.');
            }
        };

        fetchPropertyDetails();
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
                            You can find your listing under your listings page.
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
