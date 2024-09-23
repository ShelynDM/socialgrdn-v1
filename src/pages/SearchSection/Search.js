import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/Navbar/navbar";
import InAppLogo from "../../components/Logo/inAppLogo";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchResult from "../../components/SearchComponents/searchResult";
import SearchBar from "../../components/SearchComponents/search";
import SearchFilter from "../../components/SearchComponents/popupSearchFilter";
import FilterButton from "../../components/SearchComponents/filterButton";
import axios from "axios";


export default function Search() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [propertyResult, setPropertyResult] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [userPointLocation, setUserPointLocation] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [locationFetched, setLocationFetched] = useState(false);


    // Get user's location based on the user's IP address
    const getUserPointLocation = useCallback(async () => {
        if (navigator.geolocation) {
            try {
                const position = await new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                const { latitude, longitude } = position.coords;
                setUserPointLocation({ latitude, longitude });
                await fetchLocation(latitude, longitude);
                setLocationFetched(true);
            } catch (error) {
                console.error("Error getting location", error);
            }
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
        //eslint-disable-next-line
    }, []);

    const fetchLocation = useCallback(async (lat, lon) => {
        try {
            const key = process.env.REACT_APP_GEOAPIFY_API_KEY; // Replace with your actual API key
            const response = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=street&lang=en&limit=5&format=json&apiKey=${key}`);
            setUserLocation(response.data);

            console.log("Response data:", response.data);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }, []);

    useEffect(() => {
        if (!locationFetched) {
            getUserPointLocation();
        }
    }, [getUserPointLocation, locationFetched]);

    useEffect(() => {
        if (userLocation && propertyResult.length > 0) {
            filterResults();

            console.log("Point Location:", userPointLocation);
            console.log("User Location Results:", userLocation);
            console.log("Filtered Results:", filteredResults);
        }
        //eslint-disable-next-line
    }, [userLocation, propertyResult, searchQuery]);


    // Fetch property data from the API
    const fetchPropertyResults = async () => {
        try {
            const response = await fetch(`/api/getSearchResults`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const propertyData = await response.json();
            setPropertyResult(propertyData);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };


    useEffect(() => {
        fetchPropertyResults();
    }, []);


    // Handle filter button click
    const filterClicked = () => {
        openPopup();
        console.log("Search Filter Clicked");
    };

    // Open the popup
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    // Close the popup
    const closePopup = () => {
        setIsPopupOpen(false);
    };


    // Get unique suggestions from the property result
    function getUniqueSuggestions(propertyResult) {
        let wordsSet = new Set();
        propertyResult.forEach((result) => {
            const propertyName = result.property_name.toLowerCase().split(/\s+/);
            const propertyAddress = result.address_line1.toLowerCase().split(/\s+/);
            const propertyCity = result.city.toLowerCase().split(/\s+/);
            const propertyProvince = result.province.toLowerCase().split(/\s+/);
            const propertyGrowthZone = result.growth_zone.toLowerCase().split(/\s+/);
            const propertyCrop = result.crop.toLowerCase().split(/\s+/);
            const propertySoilType = result.soil_type.toLowerCase().split(/\s+/);
            const propertyFirstName = result.first_name.toLowerCase().split(/\s+/);
            const propertyLastName = result.last_name.toLowerCase().split(/\s+/);
            const propertyPostalCode = result.postal_code.toLowerCase().split(/\s+/);

            propertyName.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyAddress.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyCity.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyProvince.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyGrowthZone.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyCrop.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertySoilType.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyFirstName.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyLastName.forEach((word) => wordsSet.add(word.toLowerCase()));
            propertyPostalCode.forEach((word) => wordsSet.add(word.toLowerCase()));
        });
        return Array.from(wordsSet);
    };
    
    
    // Handle input change in the search bar
    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setIsDropDownVisible(query.length > 0);
        setSuggestions(getUniqueSuggestions(propertyResult));
    
        if (query.length > 0) {
            const filtered = suggestions.filter((field) =>
                [field]
                .some(field => field?.toLowerCase().startsWith(query))  // Use startsWith for matching at the start of the string
            );
            setFilteredResults(filtered.slice(0, 10)); // Limit results to top 10
        } else {
            setFilteredResults([]);
        }
    };


    const filterResults = useCallback(() => {
        const getSamePostalResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.postal_code.trim().slice(0,3) === userLocation.results[0].postcode.trim().slice(0,3));
        };
        console.log("ulr:", userLocation.results[0].postcode);
        
        
        const getSameCityResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.city === userLocation.results[0].city);
        };
        
        const getSameRegionResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.province === userLocation.results[0].state_code);
        };

        if (userLocation && propertyResult.length > 0) {
            let results = [];
            
            // Add same postcode results (up to 10)
            const postalResults = getSamePostalResults(userLocation, propertyResult).slice(0, 10);
            results.push(...postalResults);
    
            // Add same city results (up to 10 - results.length)
            const cityResults = getSameCityResults(userLocation, propertyResult);
            const uniqueCityResults = cityResults.filter(result => !results.includes(result));
            const cityResultsToAdd = uniqueCityResults.slice(0, Math.max(0, 10 - results.length));
            results.push(...cityResultsToAdd);
    
            // Add same region results (up to 10 - results.length)
            const regionResults = getSameRegionResults(userLocation, propertyResult);
            const uniqueRegionResults = regionResults.filter(result => !results.includes(result));
            const regionResultsToAdd = uniqueRegionResults.slice(0, Math.max(0, 10 - results.length));
            results.push(...regionResultsToAdd);
    
            // Apply search query filter
            if (searchQuery) {
                results = results.filter(result =>
                    [result.property_name, result.address_line1, result.city, result.province,
                    result.growth_zone, result.crop, result.soil_type, result.first_name, result.last_name]
                    .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }
    
            setFilteredResults(results.slice(0, 10));
        }
    }, [userLocation, propertyResult, searchQuery]);




    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" value={searchQuery} onChange={handleInputChange} />
                        {isDropDownVisible && suggestions.length > 0 && (
                        <ul className="dropdown w-full max-h-64 overflow-y-auto">
                            {suggestions
                                .filter((suggestion) => suggestion.includes(searchQuery.toLowerCase())) // Filter suggestions based on searchQuery
                                .map((suggestion, index) => (
                                    <li 
                                        key={index} 
                                        className="mx-2 p-2 border-b border-x bg-white border-gray-200 hover:bg-gray-100 transition-all text-sm" 
                                        onClick={() => {
                                            // Set the search query to the selected suggestion
                                            setSearchQuery(suggestion);
                                            setIsDropDownVisible(false);
                                        }}
                                    >
                                        <p className="text-black">{suggestion}</p>
                                    </li>
                                ))}
                        </ul>
                    )}

                        </div>
                    <div>
                        <FilterButton onclick={filterClicked} />
                    </div>
                </div>
                <div className="w-auto">
                    <SearchFilter isOpen={isPopupOpen} onClose={closePopup} className="flex items-start"/>
                </div>
                {/* Search Results Section */}
                <div className="flex flex-col w-full justify-center items-center mt-20 gap-8">
                    <div className="flex w-full justify-start pt-4 items-start">
                        <p className="text-start">Recommendations</p>
                    </div>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((result, index) => (
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
                                propertyCrop={result.crop}
                                dimensionLength={result.dimensions_length}
                                dimensionWidth={result.dimensions_width}
                                dimensionHeight={result.dimensions_height}
                                soilType={result.soil_type}
                            />
                        ))
                    ) : (
                        <p>No locations found.</p>
                    )}
                </div>
                {/* Navigation Bar */}
                <NavBar SearchColor={"#00B761"} SproutPath={Sprout} />
            </div>
        </div>
    );
}
