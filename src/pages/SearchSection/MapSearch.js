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
            <div className='p-2 fixed top-0 left-0 w-full bg-main-background'>
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
            <div className="w-full">
                <div className="flex overflow-x-auto whitespace-nowrap py-4 bg-main-background items-start">
                    <div className="flex w-full mx-2">
                        <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[1000px] flex-shrink-0 mx-1 px-1">
                            <SearchResult zoneColor={"#f00"} />
                        </div>
                        <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[1000px] flex-shrink-0 mx-1 px-1">
                            <SearchResult zoneColor={"#f00"} />
                        </div>
                        <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[1000px] flex-shrink-0 mx-1 px-1">
                            <SearchResult zoneColor={"#f00"} />
                        </div>
                        <div className="min-w-[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[1000px] flex-shrink-0 mx-1 px-1">
                            <SearchResult zoneColor={"#f00"} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
