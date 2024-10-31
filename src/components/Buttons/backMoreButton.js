/**
 * backMoreButton.js
 * Description: Button component for back and more options
 * Author: Lilian Huh
 * Date: 2024-10-23
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";
import { IoArrowBackSharp } from "react-icons/io5";


export default function BackMoreButton() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="relative flex justify-between items-center p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <button 
                onClick={() => navigate(-1)} 
                className="text-gray-500 hover:text-black focus:outline-none ml-2"
            >
                <IoArrowBackSharp size={20} />
            </button>
            <button 
                onClick={toggleSidebar} 
                className="text-gray-500 hover:text-black focus:outline-none"
            >
                <CgDetailsMore size={28} />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } w-64`}
            >
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Reports</h2>
                    <button 
                        onClick={() => navigate("/grossEarnings")} 
                        className="block w-full text-left py-2 px-4 mb-2 text-gray-700 hover:bg-gray-200"
                    >
                        Gross Earnings
                    </button>
                    <button 
                        onClick={() => navigate("/payouts")} 
                        className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200"
                    >
                        Payouts
                    </button>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-40" 
                    onClick={toggleSidebar} 
                />
            )}
        </div>
    );
}
