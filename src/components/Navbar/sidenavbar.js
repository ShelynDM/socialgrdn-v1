import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideNavBar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleNavToMyListings = () => {
        navigate('/PropertyLists');
    };

    const handleNavToMyEarnings = () => {

    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-full sm:w-1/3 md:w-1/2 lg:w-1/2 xl:w-1/3 bg-white shadow-lg transform transition-transform duration-300 z-10 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
        >

            <div className="p-4">
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    Close
                </button>
                <p className="block py-4 px-8 hover:font-bold border-b-2 border-slate-600" onClick={handleNavToMyListings}>
                    My Listings
                </p>

                <p className="block py-4 px-8 hover:font-bold" onClick={handleNavToMyEarnings}>
                    My Earnings
                </p>

            </div>
        </div>
    );
}
