import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


export default function SearchWithSuggestions({ propertyResult, onSuggestionSelect, searchQuery, onSearchQueryChange, onSearchTrigger }) {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [filteredSuggestionResults, setFilteredSuggestionResults] = useState([]);

    const navigate = useNavigate();

    // Handle redirect to search page and trigger search logic
    const handleRedirectAndSearch = (query) => {
        if (query) {
            onSearchQueryChange(query); // Update the search query in parent state
            onSearchTrigger(query); // Trigger the search logic to filter results
            navigate(`/Search?searchQuery=${query}`); // Update the URL with query
        }
        setIsDropDownVisible(false); // Close the dropdown
    };

    // Get unique suggestions from property results
    const getUniqueSuggestions = useCallback(() => {
        let wordsSet = new Set();
        propertyResult.forEach((result) => {
            const fields = [
                result.property_name,
                result.address_line1,
                result.city,
                result.province,
                result.growth_zone,
                result.crop,
                result.soil_type,
                result.first_name,
                result.last_name,
                result.postal_code,
            ];
            fields.forEach((field) => {
                if (field) {
                    field.toLowerCase().split(/\s+/).forEach((word) => wordsSet.add(word));
                }
            });
        });
        return Array.from(wordsSet);
    }, [propertyResult]);

    useEffect(() => {
        setSuggestions(getUniqueSuggestions());
    }, [getUniqueSuggestions]);

    // Handle input change in the search bar
    const handleInputChange = (e) => {
        const query = e.target.value.toLowerCase();
        onSearchQueryChange(query); // Update the search query in parent state
        
        setIsDropDownVisible(query.length > 0); // Show dropdown if query is not empty

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
            //onSearchTrigger(searchQuery);
            setIsDropDownVisible(false);
            handleRedirectAndSearch(searchQuery);
        }
    };

    // Handle selecting a suggestion
    const handleSuggestionSelect = (suggestion) => {
        // onSuggestionSelect(suggestion);  // Pass the selected suggestion to the parent component
        // onSearchTrigger(suggestion)
        // handleRedirect(suggestion);
        // onSearchQueryChange(suggestion);
        // setIsDropDownVisible(false);
        //onSearchTrigger(suggestion);
        setIsDropDownVisible(false);
        handleRedirectAndSearch(suggestion);
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