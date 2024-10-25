/**
 * PropertyResult.js
 * Description: This component fetches the property data from the API
 * Backend Author: Shelyn Del Mundo
 * Date: 2024-10-23
 */

import { useState, useEffect } from "react";

export default function PropertyResult() {
    const [propertyResult, setPropertyResult] = useState([]);
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

    return propertyResult;
}


