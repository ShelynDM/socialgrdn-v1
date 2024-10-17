import React, {useState, useEffect} from "react";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchResult from "../../components/SearchComponents/searchResult";
import SearchWithSuggestions from "../../components/SearchComponents/searchWithSuggestions";
import usePropertyResult from "../../components/SearchComponents/propertyResult";

import { useNavigate } from "react-router-dom";


export default function TrialSearch() {
    const [searchResults, setSearchResults] = useState([]);
    const [userLocation, setUserLocation] = useState(null); // Should be null initially
    const [nearestResults, setNearestResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();

    const propertyResult = usePropertyResult();

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
            .filter((result) => result.distance <= 10) // Filter within 10km
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

    // Handle suggestion select
    const handleSuggestionSelect = (selectedSuggestion) => {
        console.log("Selected Suggestion:", selectedSuggestion);
        setSearchQuery(selectedSuggestion);
    };

    // handle SeacrhQueryChange
    const handleSearchQueryChange = (query) => {
        setSearchQuery(query);
    };    
    

    //----------------------------------------------//
    const handleSearchTrigger = (searchQuery) => {
        console.log("Search triggered:", searchQuery);
        navigate(`/Search?searchQuery=${encodeURIComponent(searchQuery)}`);
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
        <div className='bg-main-background flex flex-col h-screen'>
            {/* Logo Section */}
            <div className='p-2 fixed top-0 left-0 w-full bg-main-background'>
                <InAppLogo/>
            </div>

            {/* Search Bar Section */}
            <div className=' px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                <div className="flex-grow w-full">
                <SearchWithSuggestions 
                    //value={searchQuery}
                    searchQuery={searchQuery} 
                    propertyResult={propertyResult} 
                    onSuggestionSelect={(selectedSuggestion) => handleSuggestionSelect(selectedSuggestion)}
                    onSearchQueryChange={handleSearchQueryChange}
                    onSearchTrigger={handleSearchTrigger}
                    />
                </div>
            </div>

            {/* Map Section */}
            <div className="h-60 w-full mt-24">
                <div className="w-full h-full border-2 border-gray-300 bg-white">
                    {/* Placeholder for map or listing */}
                </div>
            </div>

            {/* Search Results Section */}
            <div className="w-full overflow-x-auto">
                {nearestResults.length > 0 ? (
                    <div className="flex flex-row whitespace-nowrap py-4 bg-main-background">
                        {nearestResults.map((result, index) => (
                            <div
                                key={index}
                                className="min-w-[350px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px] xl:min-w-[1000px] mx-2 px-1 flex-shrink-0"
                            >
                                <SearchResult
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No locations within 10km.</p>
                )}
            </div>


            {/* Navigation Bar */}
            <NavBar EarthColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
