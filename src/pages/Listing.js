import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import GreenSprout from "../assets/sproutGreen.png";

// This is the Listing page of the application where users can view other users' listings
export default function Listing() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">

                Hello, Reservation!

            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
        
    );
}