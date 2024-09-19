import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { realtimeDb } from '../../_utils/firebase';

const zoneColors = {
  '0a': '#d7bde2', // Light purple
  '0b': '#c39bd3', // Purple
  '1a': '#7fb3d5', // Light blue
  '1b': '#a9cce3', // Blue
  '2a': '#a3e4d7', // Light green
  '2b': '#7dcea0', // Green
  '3a': '#28b463', // Dark green
  '3b': '#a9dfbf', // Light green
  '4a': '#BCE864', // Light yellow-green
  '4b': '#f4d03f', // Yellow
};

export default function CityZoneSelector() {
  const [data, setData] = useState({});
  const [selectedCity, setSelectedCity] = useState('');
  const [zone, setZone] = useState('');
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const zoneOptions = ['0a', '0b', '1a', '1b', '2a', '2b', '3a', '3b', '4a', '4b'];

  useEffect(() => {
    const dataRef = ref(realtimeDb, 'cities');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      try {
        const fetchedData = snapshot.val();
        setData(fetchedData);
      } catch (err) {
        console.error('Error processing data:', err);
        setError('Failed to process data.');
      }
    }, (error) => {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data.');
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filteredSuggestions = Object.keys(data).filter(cityKey =>
      data[cityKey].name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleCitySelect = (cityKey) => {
    setSelectedCity(cityKey);
    setInputValue(data[cityKey].name);
    setSuggestions([]);
    setZone(data[cityKey].code || '');
  };

  const handleZoneChange = (event) => {
    setZone(event.target.value);
  };

  const handleManualCityChange = (event) => {
    const city = event.target.value;
    setInputValue(city);
    setSelectedCity('');
    setSuggestions([]);
    setZone(''); // Clear zone if city is not in the database
  };

  return (
    <div>
      <h1>Select City and Zone</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type city name..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((cityKey) => (
            <li key={cityKey} onClick={() => handleCitySelect(cityKey)}>
              {data[cityKey].name} ({data[cityKey].code})
            </li>
          ))}
        </ul>
      )}
      <div>
        <p>Selected City: {data[selectedCity]?.name || inputValue || 'None'}</p>
        <p>Selected Zone:</p>
        {selectedCity && (
          <p style={{ backgroundColor: zoneColors[data[selectedCity]?.code] || 'transparent' }}>
            {data[selectedCity]?.code || 'None'}
          </p>
        )}
        {!selectedCity && (
          <select value={zone} onChange={handleZoneChange}>
            <option value="" disabled>Select a zone</option>
            {zoneOptions.map((zoneOption) => (
              <option key={zoneOption} value={zoneOption} style={{ backgroundColor: zoneColors[zoneOption] }}>
                {zoneOption}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
