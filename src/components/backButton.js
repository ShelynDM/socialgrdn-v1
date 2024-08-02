import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

/**
 * BackButton component renders a button that navigates to the previous page
 * when clicked. It uses the SlArrowLeft icon to represent a back arrow.
 */
export default function BackButton() {
    const navigate = useNavigate();

    return (
        <div className='px-8 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
            <button 
                onClick={() => navigate(-1)}  // Navigate to the previous page
                className="flex text-gray-500 hover:text-black focus:outline-none"
            >
                <SlArrowLeft />  {/* Back arrow icon */}
            </button>
        </div>
    );
}
