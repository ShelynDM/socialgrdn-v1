/**
 * DeletionConfirmation.js
 * Description: This page displays a confirmation message when a listing is deleted
 * Author: Shelyn Del Mundo
 *          Lilian Huh
 * Date: 2024-10-23
 */

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

import InAppLogo from "../../components/Logo/inAppLogo";
import DeletionModal from "../../components/ListingComponents/deletionModal";

export default function DeletionConfirmation() {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const navigate = useNavigate(); // Initialize navigate

    const openModal = () => {
        setIsModalVisible(true);
        console.log("Deletion Modal Opened");
    };
    const closeModal = () => {
        setIsModalVisible(false);
    };
    const handleBackToMyListings = () => {
        navigate('/ViewMyListings');
    };

    return (
        <div className='bg-main-background'>
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center min-h-screen mx-4 pb-20 bg-main-background">
                {/* Logo */}
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo/>
                </div>

                {/* Deletion Confirmation Section */}
                <div className="flex flex-col items-center justify-center w-full mt-24">
                    <p className="font-bold text-2xl">Your Listing has been deleted.</p>
                    <button onClick={handleBackToMyListings} className="w-1/2 mt-4 p-2 text-green-600 font-bold ">Back to my Listings</button>
                </div>

                <button className="w-1/2 mt-4 p-2 text-red-600 font-bold " onClick={openModal}>Delete Listing</button>

                {/* Conditionally render the DeletionModal */}
                {isModalVisible && <DeletionModal onClose={closeModal} />}
            </div>
        </div>
    );
}
