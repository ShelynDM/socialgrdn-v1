import React from "react";
import { useNavigate } from "react-router-dom"; // Use this for navigation

const DeletionModal = ({ onClose }) => { // Accept onClose as a prop
    const navigate = useNavigate(); // Initialize navigation

    const handleDeleteListing = async () => {
        const hardCodedPropertyID = 6;
        try {
            const response = await fetch(`/api/updatePropStatus`, {
                method: 'POST', // or 'PUT' depending on your backend API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_id: hardCodedPropertyID,
                    status: "0", // Change the status to 0 (inactive or deleted)
                }),
            });

            if (response.ok) {
                console.log("Property has been deleted");
                navigate('/DeletionConfirmation'); // Redirect to confirmation page
            } else {
                console.log("Property could not be deleted");
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full text-center">
                <p className="text-lg font-semibold">Permanently delete listing?</p>
                <p className="text-sm text-gray-600 mt-2">Are you sure you want to permanently delete your listing?</p>
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        className="px-8 py-2 bg-white rounded-full border border-black hover:bg-gray-100"
                        onClick={onClose} // Use the passed onClose prop
                    >
                        No
                    </button>

                    <button onClick={handleDeleteListing} className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletionModal;
