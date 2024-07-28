import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import GreenSprout from "../assets/sproutGreen.png";

export default function Listing() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-4 pb-6 w-full">
            Hello, My Reservations!
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
        
    );
}