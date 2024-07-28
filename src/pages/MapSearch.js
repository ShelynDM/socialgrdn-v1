import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import InAppLogo from '../components/inAppLogo';

export default function MapSearch() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">

                Hello, maps!

            </div>
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
        
    );
}