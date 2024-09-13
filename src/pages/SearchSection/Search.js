import React, { useEffect, useState } from "react";
import NavBar from "../../components/Navbar/navbar";
import InAppLogo from "../../components/Logo/inAppLogo";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchResult from "../../components/SearchComponents/searchResult";
import SearchBar from "../../components/SearchComponents/search";
import SearchFilter from "../../components/SearchComponents/popupSearchFilter";
import FilterButton from "../../components/SearchComponents/filterButton";

export default function Search() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // Should be null initially
    const [nearestResults, setNearestResults] = useState([]);

    const searchClicked = () => {
        openPopup();
        console.log("Search Filter Clicked");
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    // Helper function to convert degrees to radians
    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    // Haversine formula to calculate the distance between two points
    const haversineDistance = (userLocation, searchResults) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(searchResults.latitude - userLocation.latitude);  
        const dLon = deg2rad(searchResults.longitude - userLocation.longitude);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(userLocation.latitude)) * Math.cos(deg2rad(searchResults.latitude)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };


    // Get the nearest properties to the user's location
    const getNearestResults = (userLocation, searchResults) => {
        return searchResults
            .map((result) => {
                const distance = haversineDistance(userLocation, {
                    latitude: result.latitude,
                    longitude: result.longitude,
                });
                return { ...result, distance };
            })
            .filter((result) => result.distance <= 5) // Filter within 10km
            .sort((a, b) => a.distance - b.distance) // Sort by distance
            .slice(0, 10); // Get the first 10 results

    };

    // Fetch search results from the database using the API
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`/api/getSearchResults`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const searchData = await response.json();
            setSearchResults(searchData);
            console.log(searchData);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    // Get the current location of the user
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                console.log("User location:", userLocation),
                (error) => {
                    console.error("Error getting location", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    

    // Fetch search results and user location on component mount
    
    useEffect(() => {
        fetchSearchResults();
        getUserLocation();
    //eslint-disable-next-line
    }, []);

    // Calculate nearest results when the user's location or search results change
    useEffect(() => {
        if (userLocation && searchResults.length > 0) {
            const nearby = getNearestResults(userLocation, searchResults);
            setNearestResults(nearby); // Set the nearest results
            console.log("Nearest results:", nearestResults);
        }
    //eslint-disable-next-line    
    }, [userLocation, searchResults]);

    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                    <div>
                        <FilterButton onclick={searchClicked} />
                    </div>
                </div>
                <div className="w-auto">
                    <SearchFilter isOpen={isPopupOpen} onClose={closePopup} />
                </div>
                {/* Search Results Section */}
                <div className="flex flex-col w-full justify-center items-center mt-20 gap-8">
                    <div className="flex w-full justify-start pt-4 items-start  ">
                        <p className="text-start">Recommendations</p>
                    </div>
                    {nearestResults.length > 0 ? (
                        nearestResults.map((result, index) => (
                            <SearchResult
                                key={index}
                                propertyName={result.property_name}
                                addressLine1={result.address_line1}
                                city={result.city}
                                province={result.province}
                                first_name={result.first_name}
                                last_name={result.last_name}
                                growthZone={result.growth_zone}
                                propertyImage={result.photo}
                                propertyCrop={result.crop_name}
                                dimensionLength={result.dimensions_length}
                                dimensionWidth={result.dimensions_width}
                                dimensionHeight={result.dimensions_height}
                                soilType={result.soil_type}
                            />
                        ))
                    ) : (
                        <p>No locations within 10km.</p>
                    )}
                </div>
                {/* Navigation Bar */}
                <NavBar SearchColor={"#00B761"} SproutPath={Sprout} />
            </div>
        </div>
    );
}
