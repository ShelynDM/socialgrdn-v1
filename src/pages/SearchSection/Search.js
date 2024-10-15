import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../../components/Navbar/navbar";
import InAppLogo from "../../components/Logo/inAppLogo";
import Sprout from "../../assets/navbarAssets/sprout.png";
import SearchResult from "../../components/SearchComponents/searchResult";
import SearchFilter from "../../components/SearchComponents/popupSearchFilter";
import FilterButton from "../../components/SearchComponents/filterButton";
import axios from "axios";
import {ref, onValue} from "firebase/database";
import {realtimeDb} from "../../_utils/firebase";



// Import the following components to reuse search components
import SearchWithSuggestions from "../../components/SearchComponents/searchWithSuggestions";
import usePropertyResult from "../../components/SearchComponents/propertyResult";
import { useSearchParams } from "react-router-dom";

export default function Search() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [userLocation, setUserLocation] = useState();
    const [userPointLocation, setUserPointLocation] = useState(null);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [locationFetched, setLocationFetched] = useState(false);
    const [cropData, setCropData] = useState({});

    // This two functions must be called to get the property results and search parameters
    // This two functions should be added to reuse the search components in different pages
    const propertyResult = usePropertyResult();
    const [searchParams] = useSearchParams();

    // Get search query from the URL
    useEffect(() => {
        const query = searchParams.get("searchQuery");
        if (query) {
          setSearchQuery(query); // Update the state with the query from the URL
        }
      }, [searchParams]);

    
    // Function to reset filters
    const resetFilters = () => {
        setSearchQuery(""); // Clear search query
        //filterResults(); // Reset filtered results to default
    };

    // Add reset on Navbar search icon click
    const handleNavbarSearchClick = () => {
        resetFilters(); // Reset search query and filtered results
    };


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

    // Fetch location based on latitude and longitude
    const fetchLocation = useCallback(async (lat, lon) => {
        
        try {
            const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Replace with your actual API key
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&language=en&key=${key}`);

            setUserLocation(response.data.results[0]);

            console.log("Response data:", response.data.results[0]);
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    }, []);

    // Fetch user's location on page load
    useEffect(() => {
        if (!locationFetched) {
            getUserPointLocation();
        }
    }, [getUserPointLocation, locationFetched]);

    // Filter results based on user's location
    useEffect(() => {
        if (userLocation && propertyResult.length > 0) {
            filterResults();

            console.log("Point Location:", userPointLocation);
            console.log("User Location Results:", userLocation);
            console.log("Filtered Results:", filteredResults);
        }
        //eslint-disable-next-line
    }, [userLocation, propertyResult, searchQuery]);



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

    // Get crop types from the database
    const handleCropTypes = (e) => {
        const dataRef = ref(realtimeDb, 'crops');
        const unsubscribe = onValue(dataRef, (snapshot) => {
            try {
                const fetchedData = snapshot.val();
                setCropData(fetchedData);
                console.log("Crop Data:", cropData);
            } catch (err) {
                console.error('Error processing data:', err);
            }
        }, (error) => {
            console.error('Error fetching data:', error);
        });
        return () => unsubscribe();
    }

    useEffect(() => {
        handleCropTypes();
        // eslint-disable-next-line
    }, []);


    // Handle the filters made by the modal/popup filter
    const handlePopupSearchFilter = (filters) => {
        const { priceRange, cropType, gardenSize, soilType } = filters;
        console.log("Filters:");
        console.log(filters.priceRange);
        console.log(filters.cropType);
        console.log(filters.gardenSize);
        console.log(filters.soilType);


        // Define the custom matchesCropType function to check if the crop belongs to the selected category
        const matchesCropType = (result) => {
            // If no crop type is selected or "All" is selected, return all results.
            if (!cropType || cropType === "All") return true;
        
            // Utility function to normalize crop names (remove plural "s" if present)
            const normalizeCropName = (crop) => {
                if (!crop) return "";
                return crop.toLowerCase().endsWith('s') ? crop.toLowerCase().slice(0, -1) : crop.toLowerCase();
            };
        
            // Normalizing the result.crop and comparing to normalized category crop names
            const normalizedCrop = normalizeCropName(result.crop);
        
            // Ensure the cropType matches a category and check if the normalized result.crop exists in the selected category
            switch (cropType) {
                case "Fruit":
                    return cropData.fruits && cropData.fruits.map(c => normalizeCropName(c)).includes(normalizedCrop);
                case "Vegetable":
                    return cropData.vegetables && cropData.vegetables.map(c => normalizeCropName(c)).includes(normalizedCrop);
                case "Cereal":
                    return cropData.cereals && cropData.cereals.map(c => normalizeCropName(c)).includes(normalizedCrop);
                case "Spices":
                    return cropData.spices && cropData.spices.map(c => normalizeCropName(c)).includes(normalizedCrop);
                default:
                    return true;
            }
        };
                
        const filtered =  propertyResult.filter((result) => {
            //Price Range Filter
            const isWithinPriceRange = result.rent_base_price >= priceRange.min && result.rent_base_price <= priceRange.max;

            //Garden Size Filter
            const isWithinGardenSize = result.area >= gardenSize.min && result.area <= gardenSize.max;

            //Soil Type Filter
            const matchesSoilType = soilType ? result.soil_type === soilType : true;
        
            return isWithinPriceRange && matchesCropType(result) && isWithinGardenSize && matchesSoilType;
        });

        setFilteredResults(filtered);
        console.log("Modal Results:", filtered);

    }

    // Filter search results based on user's location
    const filterResults = useCallback(() => {
        const getSamePostalResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.postal_code.trim().slice(0,3) === userLocation.address_components[6].short_name.trim().slice(0,3));
        };
        console.log("ulr:", userLocation.address_components[6].short_name);
        
        
        const getSameCityResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.city === userLocation.address_components[3].long_name);
        };
        
        const getSameRegionResults = (userLocation, propertyResult) => {
            return propertyResult.filter((result) => result.province === userLocation.address_components[4].long_name);
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
    
            setFilteredResults(results.slice(0, 10));
        }
    }, [userLocation, propertyResult]);

    // Handle the filtered property results once the search query is triggered by "Enter" key or suggestion click
    const handleSearchTrigger = (searchQuery) => {
        const filtered = propertyResult.filter((result) =>
            result.property_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.address_line1.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.growth_zone.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.soil_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.last_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredResults(filtered.slice(0, 10));
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

    // Reset results on page refresh/load
    useEffect(() => {
        resetFilters();
    }, []);


    return (
        <div className='bg-main-background'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full justify-between bg-main-background'>
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
                    <div>
                        {searchQuery ? <FilterButton onclick={filterClicked} /> :
                        null
                        }
                    </div>
                </div>
                <div className="w-auto">
                    <SearchFilter isOpen={isPopupOpen} onClose={closePopup} onApplyFilters={handlePopupSearchFilter} className="flex items-start"/>
                </div>
                {/* Search Results Section */}
                <div className="flex flex-col w-full justify-start items-center mt-20 gap-8">
                    <div className="flex w-full justify-start pt-4 items-start">
                        {/* <p className="text-start">Recommendations</p> */}
                        {searchQuery ? <p className="text-start"></p> : <p className="text-start">Recommendations</p>}
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
                        <p>No property found.</p>
                    )}
                </div>
                {/* Navigation Bar */}
                <NavBar SearchColor={"#00B761"} SproutPath={Sprout} onSearchClick={handleNavbarSearchClick}/>
            </div>
        </div>
    );
}
