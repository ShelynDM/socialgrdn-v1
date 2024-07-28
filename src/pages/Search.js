import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";

import SearchBar from "../components/searchbar.js";

export default function Search() {
    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
                <SearchBar />
                
            </div>
            <NavBar SearchColor={"#00B761"} SproutPath={Sprout} />
        </div>
        
    );
}