import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import { useUser } from "../../UserContext"; // Import useUser to get the userID

export default function AddProperty() {
    const navigate = useNavigate();
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [selectedZone, setSelectedZone] = useState({ value: "", color: "" });
    const { userId } = useUser(); // Get the userID from UserContext
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        property_name: "",
        address_line1: "",
        city: "",
        province: "",
        postal_code: "",
        country: "",
        growth_zone: "",
        description: "",
        dimensions_length: "",
        dimensions_width: "",
        dimensions_height: "",
        soil_type: "",
        amenities: "",
        possible_crops: "",
        restrictions: "",
        rent_base_price: "",
    });

    const handleToggle = () => {
        setIsLocationEnabled(!isLocationEnabled);
    };

    const handleZoneChange = (event) => {
        const selectedValue = event.target.value;
        const selectedColor = event.target.options[event.target.selectedIndex].style.backgroundColor;
        setSelectedZone({ value: selectedValue, color: selectedColor });
        setFormData({ ...formData, growth_zone: selectedValue });
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            setImage(files); // Store array of images
        }
    };

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const submitData = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            submitData.append(key, value);
        }
        
        // Append the image if it exists
        if (image) {
            submitData.append('images', image);
        }

        // Append the user ID (you might want to get this from a context or state management system)
        submitData.append('userID', '1'); // Replace with actual user ID

        try {
            const response = await fetch('/api/addProperty', {
                method: 'PUT',
                body: submitData
            });

            if (!response.ok) {
                throw new Error('Failed to add property');
            }

            const result = await response.json();
            console.log(result);
            navigate('/Profile'); // Redirect to profile page after successful submission
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8" onSubmit={handleSubmit}>
                        {/* Image Upload Section */}
                        <div className="flex items-center justify-center gap-4">
                            <div className="flex flex-col items-center gap-4 my-24">
                                <label
                                    htmlFor="imageUpload"
                                    className="cursor-pointer bg-white text-green-500 font-bold py-2 px-4 border-2 border-green-500 rounded-lg  hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    + Upload Picture
                                </label>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    className="hidden"
                                    multiple // Allow multiple images
                                    onChange={handleImageChange}
                                />
                                {image && (
                                <div className="flex gap-2">
                                    {image.map((img, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(img)}
                                        alt={`Uploaded ${index}`}
                                        className="mt-4 w-40 h-40 object-cover rounded-full shadow-lg"
                                    />
                                    ))}
                                </div>
                                )}
                            </div>
                        </div>

                        {/* Property Name Field */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold">Property Name:</label>
                            <input
                                type="text"
                                placeholder="Property Name"
                                id="property_name"
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                value={formData.property_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        {/* Address and Other Fields */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="address_line1" className="text-lg font-semibold">Property Location:</label>
                            <input 
                                type="text" 
                                placeholder="Address Line 1" 
                                id="address_line1" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.address_line1}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                id="city" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Province" 
                                id="province" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.province}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Postal Code" 
                                id="postal_code" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.postal_code}
                                onChange={handleInputChange}
                            />
                            <input 
                                type="text" 
                                placeholder="Country" 
                                id="country" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.country}
                                onChange={handleInputChange}
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
                        {/* Farming zone */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="growth_zone">Farming Zone:</label>
                            <select
                                id="growth_zone"
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
                            >Check farming zone</a>
                        </div>

                        {/* Property Description */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="description">Describe your property:</label>
                            <textarea
                                id="description"
                                placeholder="Describe your property"
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                rows="4"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Dimensions Fields */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="dimensions">Dimensions:</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    placeholder="Length" 
                                    id="dimensions_length" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                    value={formData.dimensions_length}
                                    onChange={handleInputChange}
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    placeholder="Width" 
                                    id="dimensions_width" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                    value={formData.dimensions_width}
                                    onChange={handleInputChange}
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    placeholder="Height" 
                                    id="dimensions_height" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                    value={formData.dimensions_height}
                                    onChange={handleInputChange}
                                />
                                <span className="text-lg font-semibold">ft</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="soil_type">Type of Soil:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Clay, Loam, Sand" 
                                id="soil_type" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.soil_type}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="amenities">Amenities:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Shed, Electricity, Fencing" 
                                id="amenities" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.amenities}
                                onChange={handleInputChange}
                            />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="possible_crops">Possible Crops:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Carrot, Barley, Corn" 
                                id="possible_crops" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                value={formData.possible_crops}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="restrictions">Restrictions:</label>
                            <textarea
                                id="restrictions"
                                placeholder="e.g. No pets, No smoking, No planting marijuana" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                rows="3"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="price">Price:</label>

                                <h1 className="text-lg font-semibold  ">$</h1>
                                    <input 
                                    type="number" 
                                    placeholder="CAD" 
                                    id="price" 
                                    className="flex-grow  p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                />
                                <h1 className="text-lg font-semibold">/month</h1>

                        </div>

                        <h1 className="text-lg font-normal">By publishing your listing, you agree to the <strong>Terms, Conditions and Privacy Policy</strong>.</h1>
                        <LongButton
                            buttonName="Publish Listing"
                            className="w-full rounded shadow-lg bg-green-500 text-white font-bold"
                            pagePath="/Profile"
                        />
                    </form>
                </div>
            </div>
            <NavBar ProfileColor="#00B761" SproutPath={Sprout} />
        </div>
    );
}
