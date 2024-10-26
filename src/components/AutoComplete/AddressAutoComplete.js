import React, { useState, useEffect, useRef } from 'react';

const AddressAutocomplete = ({ 
    onAddressSelect, 
    resultLimit = 20,  // Default limit of 20 results
    countryCodes = ['us', 'ca']  // Default to US and Canada
}) => {
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestionRef = useRef(null);

    const GEOAPIFY_API_KEY = 'f4a5f61255ad45e6b71371ff6718394d';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchAddress = async (text) => {
        if (text.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsLoading(true);
        try {
            // Create the filter string from countryCodes array
            const filterString = countryCodes.map(code => `countrycode:${code}`).join(',');
            
            const response = await fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?` + 
                `text=${encodeURIComponent(text)}` +
                `&limit=${resultLimit}` +
                `&filter=${filterString}` +
                `&format=json` +
                `&apiKey=${GEOAPIFY_API_KEY}`
            );
            const data = await response.json();
            
            if (data.results) {
                setSuggestions(data.results);
                setShowSuggestions(true);
            }
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchText(value);
        searchAddress(value);
    };

    const handleSuggestionClick = (suggestion) => {
        const addressData = {
            addressLine1: suggestion.street || '',
            city: suggestion.city || '',
            province: suggestion.state || '',
            postalCode: suggestion.postcode || '',
            country: suggestion.country || '',
            latitude: suggestion.lat || '',
            longitude: suggestion.lon || '',
            formatted: suggestion.formatted || ''
        };

        setSearchText(addressData.formatted);
        setShowSuggestions(false);
        onAddressSelect(addressData);
    };

    return (
        <div className="relative" ref={suggestionRef}>
            <input
                type="text"
                value={searchText}
                onChange={handleInputChange}
                placeholder="Full Addresseses"
                className="w-full p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
            
            {isLoading && (
                <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500"></div>
                </div>
            )}

            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <p className="text-sm">{suggestion.formatted}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressAutocomplete;