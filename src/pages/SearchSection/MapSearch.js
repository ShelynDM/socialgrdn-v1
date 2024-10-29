import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, Marker, Circle, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import InAppLogo from '../../components/Logo/inAppLogo';
import NavBar from '../../components/Navbar/navbar';
import Sprout from '../../assets/navbarAssets/sprout.png';
import SearchResult from '../../components/SearchComponents/searchResult';

const libraries = ['places']; // Move the libraries array outside of the component

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  position: 'relative',
  border: '5px solid white',
  borderRadius: '15px',
};

const mapWrapperStyle = (mapHeight) => ({
  width: '100%',
  height: mapHeight,
  position: 'relative',
  transition: 'height 0.3s ease-in-out',
});

const defaultCenter = {
  lat: 51.0447,
  lng: -114.0719,
};

const handleStyle = {
  position: 'absolute',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '60px',
  height: '10px',
  backgroundColor: '#ccc',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 1000,
};

export default function MapSearch() {
  const [userLocation, setUserLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null); // For holding selected property details
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapHeight, setMapHeight] = useState('40vh');
  const mapRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const autocompleteRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries, // Use the constant variable here
  });

  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/getSearchResults');
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

  useEffect(() => {
    fetchSearchResults();
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

  const toggleMapExpansion = () => {
    const newMapHeight = isExpanded ? '40vh' : '85vh';
    setMapHeight(newMapHeight);
    setIsExpanded(!isExpanded);
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const location = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setUserLocation(location);
        mapRef.current.panTo(location);
        mapRef.current.setZoom(15);
      }
    }
  };

  const handleMarkerClick = (result) => {
    setSelectedPlace(result); // Set the clicked place as selected
  };

  // const handleViewProperty = async () => {
  //   if (selectedPlace) {
  //     try {
  //       // Fetch the selected property details
  //       const response = await fetch(`/api/getPropertyDetails?property_id=${selectedPlace.id}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch property details');
  //       }
  //       const propertyDetails = await response.json();

  //       // Navigate to the ViewProperty component with the fetched details
  //       navigate('/ViewProperty', { state: { propertyDetails } });
  //     } catch (error) {
  //       console.error('Error fetching property details:', error);
  //     }
  //   }
  // };


  // Handle property click to view property details
  const handlePropertyClick = (propertyId) => {
    console.log("Property ID:", propertyId);
    // Navigate to the property details page
    navigate(`/ViewProperty/${propertyId}`);
  }

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div className="bg-main-background flex flex-col h-screen">
      <motion.div
        className="fixed top-0 left-0 w-full bg-main-background z-20 p-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <InAppLogo />
      </motion.div>

      <motion.div
        className="flex-grow flex items-center justify-center"
        style={{ marginTop: '50px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="w-full" style={{ position: 'relative' }}>
          <div style={mapWrapperStyle(mapHeight)}>
            <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={handlePlaceSelect}>
              <input
                type="text"
                placeholder="Search for a place..."
                style={{
                  boxSizing: 'border-box',
                  border: '1px solid transparent',
                  width: 'calc(100% - 40px)',
                  height: '40px',
                  padding: '0 12px',
                  borderRadius: '15px',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  margin: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  textOverflow: 'ellipses',
                  position: 'absolute',
                  left: '10px',
                  top: '10px',
                  zIndex: 1000,
                }}
              />
            </Autocomplete>

            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={userLocation || defaultCenter}
              onLoad={(map) => (mapRef.current = map)}
            >
              {userLocation && (
                <>
                  <Marker
                    position={userLocation}
                    icon={{
                      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                    }}
                  />
                  <Circle
                    center={userLocation}
                    radius={1500}
                    options={{
                      strokeColor: '#00B761',
                      fillColor: '#00B761',
                      fillOpacity: 0.1,
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                    }}
                  />
                </>
              )}

              {searchResults.map((result, index) => (

                <Marker
                  key={index}
                  position={{
                    lat: result.latitude,
                    lng: result.longitude,
                  }}
                  icon={{
                    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                  }}
                  onClick={() => handleMarkerClick(result)} // Show details when marker is clicked
                />
              ))}
            </GoogleMap>

            <div style={handleStyle} onClick={toggleMapExpansion}></div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="overflow-y-scroll bg-main-background mt-2 h-[50vh] p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col mx-auto px-2 gap-2 max-w-lg">
          {loading ? (
            <div>Loading search results...</div>
          ) : error ? (
            <div>{error}</div>
          ) : selectedPlace ? (
            <div className="p-2 bg-white rounded-lg shadow-md">
              <SearchResult
                propertyName={selectedPlace.property_name}
                addressLine1={selectedPlace.address_line1}
                city={selectedPlace.city}
                province={selectedPlace.province}
                first_name={selectedPlace.first_name}
                last_name={selectedPlace.last_name}
                propertyCrop={selectedPlace.crop}
                dimensionLength={selectedPlace.dimensions_length}
                dimensionWidth={selectedPlace.dimensions_width}
                dimensionHeight={selectedPlace.dimensions_height}
                soilType={selectedPlace.soil_type}
                imageUrl={selectedPlace.image_url}
                growthZone={selectedPlace.growth_zone}



                onClick={() => handlePropertyClick(selectedPlace.property_id)}
              />
            </div>
          ) : (
            searchResults.map((result, index) => (
              <div key={index} className="p-2 bg-white rounded-lg shadow-md">
                <SearchResult
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

                  onClick={() => handlePropertyClick(result.property_id)}
                />
              </div>
            ))
          )}
        </div>
      </motion.div>

      <NavBar EarthColor="#00B761" SproutPath={Sprout} />
    </div>
  );
}
