import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import InAppLogo from '../../components/Logo/inAppLogo';
import NavBar from '../../components/Navbar/navbar';
import Sprout from '../../assets/navbarAssets/sprout.png';
import SearchBar from '../../components/SearchComponents/search';
import SearchResult from '../../components/SearchComponents/searchResult';

// Define the style for the Google Map container
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Define the dynamic map wrapper style
const mapWrapperStyle = (mapHeight) => ({
  width: '100%',
  height: mapHeight, // Dynamic height based on state
  backgroundColor: 'white',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
  padding: '10px',
  overflow: 'hidden',
  position: 'relative',
  transition: 'height 0.3s ease-in-out',
});

// Default center for the map (Calgary, AB)
const defaultCenter = {
  lat: 51.0447,
  lng: -114.0719,
};

// Style for the clickable handle
const handleStyle = {
  position: 'absolute',
  bottom: '10px', // Keep it above the bottom navigation
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
  cursor: 'pointer',
  margin: '10px 0',
};

export default function MapSearch() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [placesResults, setPlacesResults] = useState([]); // State to store places results
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapHeight, setMapHeight] = useState('400px'); // Set initial height to 400px
  const mapRef = useRef(null); // To keep a reference of the map
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the map is expanded or collapsed

  // Load the Google Maps script using your API key and load the places library
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'], // Load Places library
  });

  // Fetch search results from backend API
  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/getSearchResults'); // Adjust this URL based on your backend
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch nearby places using Google Places API
  const fetchNearbyPlaces = (map, location) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: location,
      radius: '1500', // Search within 1.5 km
      type: ['restaurant', 'park'], // You can modify this to any place type you want
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setPlacesResults(results);
      } else {
        console.error('Error fetching nearby places:', status);
      }
    });
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSearchResults();
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
      });
    }
  }, []);

  // Fetch nearby places once the map and user location are available
  useEffect(() => {
    if (mapRef.current && userLocation) {
      fetchNearbyPlaces(mapRef.current, userLocation);
    }
  }, [userLocation, mapRef]);

  // Toggle the map height between collapsed and expanded
  const toggleMapExpansion = () => {
    const navBarHeight = 100; // Set the navigation bar height manually (e.g., 100px)
    const screenHeight = window.innerHeight; // Get the full screen height
    const newMapHeight = isExpanded
      ? '400px' // Collapse the map
      : `calc(90vh - ${navBarHeight}px)`; // Expand the map but stop at the nav bar
    setMapHeight(newMapHeight);
    setIsExpanded(!isExpanded); // Toggle expansion state
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="bg-main-background flex flex-col h-screen">
      {/* Logo Section */}
      <div className="p-2 fixed top-0 left-0 w-full bg-main-background z-10">
        <InAppLogo />
      </div>

      {/* Search Bar Section */}
      <div className="px-2 fixed top-12 w-full bg-main-background z-10">
        <SearchBar />
      </div>

      {/* Map Section */}
      <div className="flex-grow flex items-center justify-center mt-24">
        <div className="w-full flex justify-center">
          <div style={mapWrapperStyle(mapHeight)}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={userLocation || defaultCenter}
              onLoad={(map) => (mapRef.current = map)} // Set mapRef once the map is loaded
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                  }}
                />
              )}

              {/* Add markers for search results */}
              {searchResults.length > 0 &&
                searchResults.map((result) => (
                  <Marker
                    key={result.id}tuh
                    position={{
                      lat: result.latitude,
                      lng: result.longitude,
                    }}
                  />
                ))}

              {/* Add markers for nearby places fetched by Google Places API */}
              {placesResults.length > 0 &&
                placesResults.map((place) => (
                  <Marker
                    key={place.place_id}
                    position={{
                      lat: place.geometry.location.lat(),
                      lng: place.geometry.location.lng(),
                    }}
                    title={place.name}
                  />
                ))}
            </GoogleMap>
            {/* Clickable Handle */}
            <div style={handleStyle} onClick={toggleMapExpansion}></div>
          </div>
        </div>
      </div>

      {/* Search Results Section */}
      <div className="flex overflow-x-auto whitespace-nowrap py-4 bg-main-background">
        <div className="flex mx-2 px-2 gap-2">
          {loading ? (
            <div>Loading search results...</div>
          ) : error ? (
            <div>{error}</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result.id}
                className="min-w-[300px] p-2 bg-white rounded-lg shadow-md"
              >
                <SearchResult
                  propertyName={result.property_name}
                  addressLine1={result.address_line1}
                  city={result.city}
                  province={result.province}
                  crop={result.crop}
                  farmArea={result.farm_area}
                  soilType={result.soil_type}
                  imageUrl={result.image_url}
                />
              </div>
            ))
          ) : (
            <div>No results found.</div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <NavBar EarthColor="#00B761" SproutPath={Sprout} />
    </div>
  );
}
