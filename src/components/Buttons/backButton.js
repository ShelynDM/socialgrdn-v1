import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

// This is a back button component that can be used throughout the application
export default function BackButton() {
    const navigate = useNavigate();

    return (
        <div className='px-8 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
            <button 
                onClick={() => navigate(-1)} 
                className="flex text-gray-500 hover:text-black focus:outline-none"
            >
                <SlArrowLeft /> 
                
            </button>
        </div>
    );
}