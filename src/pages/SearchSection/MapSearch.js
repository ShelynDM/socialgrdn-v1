import React from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchBar from "../../components/SearchComponents/search";
import SearchResult from "../../components/SearchComponents/searchResult";

export default function MapSearch() {
    return (
        <div className='bg-main-background flex flex-col h-screen'>
            {/* Logo Section */}
            <div className='p-2 fixed top-0 left-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                <InAppLogo/>
            </div>

            {/* Search Bar Section */}
            <div className=' px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                <div className="flex-grow w-full">
                    <SearchBar className="w-full" />
                </div>
            </div>

            {/* Map Section */}
            <div className="h-60 w-full mt-24">
                <div className="w-full h-full border-2 border-gray-300 bg-white">
                    {/* Placeholder for map or listing */}
                </div>
            </div>

            {/* Search Results Section */}
            <div className="flex overflow-x-auto whitespace-nowrap py-4 bg-main-background">
                <div className="flex mx-2 px-2 gap-2">
                    <SearchResult zoneColor={"#f00"} />
                    <SearchResult zoneColor={"#f00"} />                                    
                </div>
            </div>

            {/* Navigation Bar */}
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
