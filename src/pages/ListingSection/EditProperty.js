import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import InAppLogo from "../../components/Logo/inAppLogo";
import Swal from 'sweetalert2';
import NavBar from "../../components/Navbar/navbar";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import Sprout from "../../assets/navbarAssets/sprout.png";
import withReactContent from 'sweetalert2-react-content';

export default function EditProperty() {
    const { property_id } = useParams(); // Get property_id from URL
    const [property, setProperty] = useState({});
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [selectedZone, setSelectedZone] = useState({ value: "", color: "" });
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                console.log('Property ID:', property_id); // Log Property ID
                const apiUrl = `/api/getPropertyDetails?property_id=${property_id}`;
                console.log('API URL being sent:', apiUrl); // Log API URL
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }
                const data = await response.json();
                setProperty(data);
                setImage(data.photo); // Assuming the photo is part of the property data
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };
    
        if (property_id) {
            fetchProperty();
        }
    }, [property_id]);

    const handleToggle = () => {
        setIsLocationEnabled(!isLocationEnabled);
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setProperty((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleZoneChange = (event) => {
        const selectedValue = event.target.value;
        const selectedColor = event.target.options[event.target.selectedIndex].style.backgroundColor;
        setSelectedZone({ value: selectedValue, color: selectedColor });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const MySwal = withReactContent(Swal);
    const handleSaveChanges = async () => {
        try {
            const formData = new FormData();
            formData.append('property_id', property_id);
            formData.append('photo', image);

            // Extract and transform variables from property state
            const { 
                property_name: propertyName, 
                description, 
                dimensions_length: dimensionsLength, 
                dimensions_width: dimensionsWidth, 
                dimensions_height: dimensionsHeight, 
                soil_type: soilType, 
                amenities, 
                restrictions, 
                rent_base_price: rentBasePrice, 
                address_line1: addressLine1, 
                city, 
                province, 
                postal_code: postalCode, 
                crops 
            } = property;

            formData.append('property_name', propertyName);
            formData.append('description', description);
            formData.append('dimensions_length', dimensionsLength);
            formData.append('dimensions_width', dimensionsWidth);
            formData.append('dimensions_height', dimensionsHeight);
            formData.append('soil_type', soilType);
            formData.append('amenities', amenities);
            formData.append('restrictions', restrictions);
            formData.append('rent_basePrice', rentBasePrice);
            formData.append('address_line1', addressLine1);
            formData.append('city', city);
            formData.append('province', province);
            formData.append('postal_code', postalCode);
            formData.append('crops', crops ? crops.split(',').map(crop => crop.trim()) : []);

            const response = await fetch(`/api/editPropertyDetails?property_id=${property_id}`, {
                method: 'PATCH',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update property');
            }

            MySwal.fire({
                title: 'Update Successful',
                text: 'The property details have been updated.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00B761'
            }).then(() => {
                navigate(`/ViewMyProperty/${property_id}`);
            });
        } catch (error) {
            console.error('Error updating property:', error);
            MySwal.fire({
                title: 'Error',
                text: 'There was an issue updating the property. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };
    


 return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8">
                        {/* Image Upload Section */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="imageUpload">Image:</label>
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Uploaded Image"
                                    className="mt-4 w-40 h-40 object-cover rounded-full shadow-lg"
                                />
                            )}
                        </div>

                        {/* Property Name Field */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold">Property Name:</label>
                            <input
                                type="text"
                                placeholder="Property Name"
                                id="property_name"
                                value={property.property_name || ''}
                                onChange={handleInputChange}
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Address and Other Fields */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="address" className="text-lg font-semibold">Property Location:</label>
                            <input
                                type="text"
                                placeholder="Address Line 1"
                                id="address_line1"
                                value={property.address_line1 || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                id="city"
                                value={property.city || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Province"
                                id="province"
                                value={property.province || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <input
                                type="text"
                                placeholder="Postal Code"
                                id="postalCode"
                                value={property.postal_code || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-start">
                                    <h1 className="text-lg font-semibold">Show your specific location</h1>
                                    <p className="text-sm">Your specific location will only be visible once a reservation is made.</p>
                                </div>
                                <div className="flex items-center">
                                    {/* Toggle Button */}
                                    <div
                                        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${isLocationEnabled ? "bg-green-500" : "bg-gray-400"}`}
                                        onClick={handleToggle}
                                    >
                                        <div
                                            className={`bg-white w-6 h-6 rounded-full shadow-md transform ${isLocationEnabled ? "translate-x-7" : ""}`}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Farming Zone */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="farmingZone">Farming Zone:</label>
                            <select
                                id="farmingZone"
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                onChange={handleZoneChange}
                                value={selectedZone.value}
                                style={{ backgroundColor: selectedZone.color, color: '#000000' }}
                            >
                                <option value="0a" style={{ backgroundColor: '#d7bde2' }}>0a</option>
                                <option value="0b" style={{ backgroundColor: '#c39bd3' }}>0b</option>
                                <option value="1a" style={{ backgroundColor: '#7fb3d5' }}>1a</option>
                                <option value="1b" style={{ backgroundColor: '#a9cce3' }}>1b</option>
                                <option value="2a" style={{ backgroundColor: '#a3e4d7' }}>2a</option>
                                <option value="2b" style={{ backgroundColor: '#7dcea0' }}>2b</option>
                                <option value="3a" style={{ backgroundColor: '#28b463' }}>3a</option> 
                                <option value="3b" style={{ backgroundColor: '#a9dfbf' }}>3b</option> 
                                <option value="4a" style={{ backgroundColor: '#BCE864' }}>4a</option> 
                                <option value="4b" style={{ backgroundColor: '#f4d03f' }}>4b</option> 
                            </select>
                            <a 
                                href="https://plantagreenhouses.com/blogs/planting-zones/alberta?c=ca" 
                                className="text-sm font-semibold underline hover:text-blue-600 visited:text-purple-600"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Check farming zone
                            </a>
                        </div>

                        {/* Property Description */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="description">Describe your property:</label>
                            <textarea
                                id="description"
                                placeholder="Describe your property"
                                value={property.description || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                rows="4"
                            />
                        </div>

                        {/* Dimensions Fields */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="dimensions">Dimensions:</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Length"
                                    id="length"
                                    value={property.length || ''}
                                    onChange={handleInputChange}
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input
                                    type="number"
                                    placeholder="Width"
                                    id="width"
                                    value={property.width || ''}
                                    onChange={handleInputChange}
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input
                                    type="number"
                                    placeholder="Height"
                                    id="height"
                                    value={property.height || ''}
                                    onChange={handleInputChange}
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <span className="text-lg font-semibold">ft</span>
                            </div>
                        </div>

                        {/* Soil Type */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="soilType">Type of Soil:</label>
                            <input
                                type="text"
                                placeholder="e.g. Clay, Loam, Sand"
                                id="soilType"
                                value={property.soil_type || ''}
                                onChange={handleInputChange}
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Amenities */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="amenities">Amenities:</label>
                            <input
                                type="text"
                                placeholder="e.g. Shed, Electricity, Fencing"
                                id="amenities"
                                value={property.amenities || ''}
                                onChange={handleInputChange}
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Possible Crops */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="possibleCrops">Possible Crops:</label>
                            <input
                                type="text"
                                placeholder="e.g. Carrot, Barley, Corn"
                                id="crops"
                                value={property.crops || ''}
                                onChange={handleInputChange}
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Restrictions */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="restrictions">Restrictions:</label>
                            <textarea
                                id="restrictions"
                                placeholder="e.g. No pets, No smoking, No planting marijuana"
                                value={property.restrictions || ''}
                                onChange={handleInputChange}
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                rows="3"
                            />
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="price">Price:</label>
                            <h1 className="text-lg font-semibold">$</h1>
                            <input
                                type="number"
                                placeholder="CAD"
                                id="price"
                                value={property.rent_base_price || ''}
                                onChange={handleInputChange}
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            <h1 className="text-lg font-semibold">/month</h1>
                        </div>

                        <LongButton
                        buttonName="Save Changes"
                        className="w-full rounded shadow-lg bg-green-500 text-white font-bold"
                        type="button"
                        onClick={handleSaveChanges}
/>
                    </form>
                </div>
            </div>
            <NavBar ProfileColor="#00B761" SproutPath={Sprout} />
        </div>
    );
}