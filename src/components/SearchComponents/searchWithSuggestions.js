import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


export default function SearchWithSuggestions({ propertyResult, onSuggestionSelect, searchQuery, onSearchQueryChange, onSearchTrigger }) {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestionResults, setFilteredSuggestionResults] = useState([]);

    const navigate = useNavigate();

    // Handle redirect to search page when a suggestion is selected
    const handleRedirect = (searchQuery) => {
        // Redirect to search page with the selected suggestion
        console.log("Page is redirecting to search page with the selected suggestion");
        //navigate(`/Search?search=${searchQuery}`);

        if (searchQuery) {
            navigate(`/Search?searchQuery=${searchQuery}`);
        }else{
            navigate(`/Search`);
        }
    };

    // Get unique suggestions from the property result
    const getUniqueSuggestions = useCallback(() => {
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
    }, [propertyResult]);

    useEffect(() => {
        setSuggestions(getUniqueSuggestions());
    }, [getUniqueSuggestions]);

    // Handle input change in the search bar
    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        onSearchQueryChange(query);
        
        setIsDropDownVisible(query.length > 0);

        if (query.length > 0) {
            const filtered = suggestions.filter((field) =>
                field.startsWith(query)  // Use startsWith for matching at the start of the string
            );
            setFilteredSuggestionResults(filtered.slice(0, 10)); // Limit results to top 10
        } else {
            setFilteredSuggestionResults([]);
        }
    };

    // handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearchTrigger(searchQuery);
            setIsDropDownVisible(false);
            handleRedirect(searchQuery);
        }
    };

    // Handle selecting a suggestion
    const handleSuggestionSelect = (suggestion) => {
        onSuggestionSelect(suggestion);  // Pass the selected suggestion to the parent component
        onSearchTrigger(suggestion)
        handleRedirect(suggestion);
        onSearchQueryChange(suggestion);
        setIsDropDownVisible(false);
    };

    return (
        <div className="w-full">
            <div className="w-auto flex items-center input-wrapper rounded-md border border-gray-300 p-1 mx-2" >
                <FaSearch className="search-icon mx-1"/>
                <input placeholder="Search" className="w-full" value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyPress}/>
            </div>
            
            {isDropDownVisible && filteredSuggestionResults.length > 0 && (  
                <ul className="dropdown w-full max-h-64 overflow-y-auto">
                    {filteredSuggestionResults.map((suggestion, index) => (
                        <li
                            key={index}
                            className="mx-2 p-2 border-b border-x bg-white border-gray-200 hover:bg-gray-100 transition-all text-sm"
                            onClick={() => handleSuggestionSelect(suggestion)}
                        >
                            <p className="text-black">{suggestion}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
