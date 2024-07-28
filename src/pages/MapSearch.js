import React from "react";
import InAppLogo from "../assets/SocialGrdnInAppLogo.png";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import InAppLogo from '../components/inAppLogo';

export default function MapSearch() {
    return (
        <div className='bg-main-background relative'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
                <div className='p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                    <img src={InAppLogo} alt="Social Grdn Logo" className="w-auto h-auto"/>
                </div>

                Hello, maps!

            </div>
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
        
    );
}