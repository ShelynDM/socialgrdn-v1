import React, { useState } from 'react';
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import list from "../ReservationSection/ReservationList.json";

export default function EditProperty() {
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [selectedZone, setSelectedZone] = useState({ value: "", color: "" });
    const [image, setImage] = useState(null);

    const handleToggle = () => {
        setIsLocationEnabled(!isLocationEnabled);
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

    return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8">
                        <div className="flex items-center justify-center gap-4">
                            {/* Image Upload Section */}
                            <div className="flex flex-col items-center gap-4 my-24">
                                <label
                                    htmlFor="imageUpload"
                                    className="cursor-pointer bg-white text-green-500 font-bold py-2 px-4 border-2 border-green-500 rounded-lg  hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                + Upload Picture
                                </label>

                                <input
                                    type="file"s
                                    id="imageUpload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {image && (
                                    <img
                                        src={image}
                                        alt="Uploaded"
                                        className="mt-4 w-40 h-40 object-cover rounded-full shadow-lg"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Property Name Field */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold">Property Name:</label>
                            <input
                                type="text"
                                placeholder="Property Name"
                                id="propertyName"
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        
                        {/* Address and Other Fields */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="address" className="text-lg font-semibold">Property Location:</label>
                            <input 
                                type="text" 
                                placeholder="Address Line 1" 
                                id="address" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                id="city" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Province" 
                                id="province" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Postal Code" 
                                id="postalCode" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                placeholder="Country" 
                                id="country" 
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
                        {/* Farming zone */}
                         <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="zone">Farming Zone:</label>
                            <select
                                id="farmingZone"
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                                onChange={handleZoneChange}
                                value={selectedZone.value}
                                style={{ backgroundColor: selectedZone.color, color: '#000000' }} // Applying selected color
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
                            <label className="text-lg font-semibold" htmlFor="propertyDescription">Describe your property:</label>
                            <textarea
                                id="propertyDescription"
                                placeholder="Describe your property"
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
        className=" w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
    />
    <span className="text-lg font-semibold">x</span>
    <input 
        type="number" 
        placeholder="Width" 
        id="width" 
        className="w-1/3  p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
    />
    <span className="text-lg font-semibold">x</span>
    <input 
        type="number" 
        placeholder="Height" 
        id="height" 
        className=" w-1/3  p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
    />
    <span className="text-lg font-semibold">ft</span>
    </div>
</div>

                        
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="soilType">Type of Soil:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Clay, Loam, Sand" 
                                id="soilType" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                        </div>
                        
                        
                        
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="amenities">Amenities:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Shed, Electricity, Fencing" 
                                id="amenities" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="possibleCrops">Possible Crops:</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Carrot, Barley, Corn" 
                                id="possibleCrops" 
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
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

                        
                        <LongButton
                            buttonName="Save Changes"
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