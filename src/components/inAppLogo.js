import React from "react";
import AppLogo from "../assets/SocialGrdnInAppLogo.png";

export default function InAppLogo() {
    return (
        <header className='py-2 fixed block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 top-0 left-0'>
            <img src={AppLogo} alt="Social Grdn Logo" className="w-auto h-auto"/>
            
        </header>
    );
}