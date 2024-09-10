import React from "react";
import AppLogo from "../../assets/logo/SocialGrdnInAppLogo.png";

// This is the logo component that is displayed in the left corner of the application
export default function InAppLogo() {
    return (
        <header className='py-2 block fixed w-full top-0 left-0 bg-main-background'>
            <img src={AppLogo} alt="Social Grdn Logo" className="w-auto h-auto bg-main-background"/>
        </header>
    );
}