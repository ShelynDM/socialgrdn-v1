import React from "react";
import { SlArrowLeft } from "react-icons/sl";

export default function BackButton() {
    return (
    <div className=' px-8 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
      <button className="flex text-gray-500 hover:text-black focus:outline-none">
        <SlArrowLeft />
      </button>
    </div>
    );
}
