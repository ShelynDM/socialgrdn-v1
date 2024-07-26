import React from "react";
import NavBar from "../components/navbar";
import GreenSprout from "../assets/sproutGreen.png";
import InAppLogo from "../components/inAppLogo";

export default function Listing() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
                Hello, Social Grdn!
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}