import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { CgDetailsMore } from "react-icons/cg";

export default function BackMoreButton() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
            <button 
                onClick={() => navigate(-1)} 
                className="text-gray-500 hover:text-black focus:outline-none ml-2"
            >
                <SlArrowLeft size={20} />
            </button>
            <button className="text-gray-500 hover:text-black focus:outline-none">
                <CgDetailsMore size={28} />
            </button>
        </div>
    );
}
