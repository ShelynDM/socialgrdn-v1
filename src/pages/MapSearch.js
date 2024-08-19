import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import SearchBar from "../components/searchbar";

// This is the MapSearch page of the application where users can search for a location on the map and view the listings
export default function MapSearch() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
                <SearchBar />
                Hello, maps!

            </div>
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
        
    );
}