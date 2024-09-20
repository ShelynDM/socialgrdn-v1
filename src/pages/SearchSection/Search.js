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
    //const [userPointLocation, setUserPointLocation] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setIsDropDownVisible(query.length > 0);
    
        if (query.length > 0) {
            const filtered = propertyResult.filter((result) =>
                [result.property_name, result.address_line1 , result.city, result.province, 
                 result.growth_zone, result.crops, result.soil_type, result.first_name, result.last_name]
                .some(field => field?.toLowerCase().startsWith(query))  // Use startsWith for matching at the start of the string
            );
            setFilteredResults(filtered.slice(0, 10)); // Limit results to top 10
        } else {
            setFilteredResults([]);
        }
    };

    const filterClicked = () => {
        openPopup();
        console.log("Search Filter Clicked");
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

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

    // const getUserPointLocation = () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setUserPointLocation({
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                 });
    //             },
    //             console.log("User location:", userLocation),
    //             (error) => {
    //                 console.error("Error getting location", error);
    //             }
    //         );
    //     } else {
    //         console.error("Geolocation is not supported by this browser.");
    //     }
    // };

    // Fetch user's location
    const fetchLocation = async () => {
        try {
            const response = await axios.get('https://ipapi.co/json/');

            setUserLocation(response.data);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    // get the actual user location based on the user's IP address and user point location
    // const getUserLocation = () => {
    //     getUserPointLocation();
    //     fetchLocation();
    //     if (userPointLocation.latitude && userPointLocation.longitude === userLocation.latitude && userLocation.longitude) {
    //         return userLocation;
    //     }
    // };


    const getSamePostalResults = (userLocation, propertyResult) => {
        return propertyResult.filter((result) => result.postal_code.replace(/\s/g, '').substring(0, 3) === userLocation.postal);
    };

    const getSameCityResults = (userLocation, propertyResult) => {
        return propertyResult.filter((result) => result.city === userLocation.city);
    };

    const getSameRegionResults = (userLocation, propertyResult) => {
        return propertyResult.filter((result) => result.province === userLocation.region_code);
    };

    const filterResults = useCallback(() => {
        if (userLocation && propertyResult.length > 0) {
            let results = [];

            const postalResults = getSamePostalResults(userLocation, propertyResult);
            results = results.concat(postalResults);

            if (results.length < 10) {
                const cityResults = getSameCityResults(userLocation, propertyResult);
                results = results.concat(cityResults.filter(result => !results.includes(result))); 
            }

            if (results.length < 10) {
                const regionResults = getSameRegionResults(userLocation, propertyResult);
                results = results.concat(regionResults.filter(result => !results.includes(result))); 
            }

            if (searchQuery) {
                results = results.filter(result =>
                    [result.property_name, result.address_line1, result.city, result.province, 
                    result.growth_zone, result.crops, result.soil_type, result.first_name, result.last_name]
                    .some(field => field?.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            }

            setFilteredResults(results.slice(0, 10));
        }
    }, [userLocation, propertyResult, searchQuery]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchLocation();
            await fetchPropertyResults();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userLocation && propertyResult.length > 0) {
            filterResults();
        }
    }, [userLocation, propertyResult, searchQuery]);

    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" value={searchQuery} onChange={handleInputChange} />
                        {isDropDownVisible && filteredResults.length > 0 && (
                        <ul className="dropdown w-full max-h-64 overflow-y-auto">
                            {filteredResults.map((result, index) => {
                                const matchedFields = [
                                    result.property_name,
                                    result.address_line1,
                                    result.city,
                                    result.province,
                                    result.growth_zone,
                                    result.crops,
                                    result.soil_type,
                                    result.first_name,
                                    result.last_name,
                                ].filter(field => field?.toLowerCase().startsWith(searchQuery.toLowerCase()));

                                return matchedFields.length > 0 && (
                                    <li key={index} className="mx-2 p-2 border-b border-x bg-white border-gray-200 hover:bg-gray-100 transition-all text-sm" 
                                    onClick={() => {
                                        //set the search query to the selected field
                                        setSearchQuery(matchedFields[0]);
                                        setIsDropDownVisible(false);
                                    }}>
                                        {matchedFields.map((field, i) => (
                                            <p key={i} className="text-black">{field}</p>
                                        ))}
                                    </li>
                                );
                            })}
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
                                propertyCrop={result.crops}
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
