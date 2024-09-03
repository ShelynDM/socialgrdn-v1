import React, { useState } from 'react'; 
import InAppLogo from "../../components/Logo/inAppLogo";
import BackButton from "../../components/Buttons/backButton";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { FaLocationDot } from "react-icons/fa6";

// Hardcoded property data
const property = {
    name: 'Greenhouse on the hill',
    address: '123 Main St, Calgary, AB',
    images: [
        'https://via.placeholder.com/400x200',
        'https://via.placeholder.com/400x200?text=Image+2',
        'https://via.placeholder.com/400x200?text=Image+3'
    ],
    zone: '4a',
    description: 'A beautiful greenhouse on the hill with a view of the city, surrounded by vibrant wildflowers that dance in the breeze. Inside, lush greenery flourishes under the soft glow of sunlight filtering through the glass.',
    dimension: '20x20',
    soilType: 'Clay',
    amenities: ['Water', 'Electricity', 'Shed'],
    restrictions: ['No pets', 'No smoking'],
    possibleCrops: ['Tomatoes'],
    price: 100,
    owner: {
        username: 'GreenThumb24',
        image: 'https://via.placeholder.com/50'
    }
};

export default function ViewMyProperty() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-4 min-h-screen pb-20">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        {/* Property Name and Button */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{property.name}</h2>
                            <button className="text-lg font-bold text-green-600 py-2 px-4">Edit</button>
                        </div>
                        {/* Property Location and Zone */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center space-x-2 flex-grow">
                                <FaLocationDot className="text-xl text-gray-500" />
                                <p className="text-sm text-gray-700">{property.address}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-200 rounded"></div>
                                <p className="text-sm text-gray-700 font-semibold">{property.zone}</p>
                            </div>
                        </div>
                        {/* Property Image with Indicator */}
                        <div className="relative mb-4">
                            <img
                                src={property.images[currentImageIndex]}
                                alt={property.name}
                                className="w-full h-60 object-cover rounded-md"
                            />
                            {property.images.length > 1 && (
                                <div className="absolute bottom-2 right-2 p-2 text-xs text-gray-700">
                                    {currentImageIndex + 1}/{property.images.length}
                                </div>
                            )}
                            {property.images.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between px-4">
                                    <button 
                                        onClick={handlePrevImage} 
                                        className="text-gray-700 p-2 font-bold rounded-full ">
                                        &lt;
                                    </button>
                                    <button 
                                        onClick={handleNextImage} 
                                        className="text-gray-700 p-2 font-bold rounded-full ">
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Property Description */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 font-semibold mb-2"><strong>About property:</strong></p>
                            <p className="text-sm text-gray-700">{property.description}</p>
                        </div>
                        {/* Property Details */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 mb-2"><strong>Dimensions:</strong> {property.dimension}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Soil Type:</strong> {property.soilType}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Restrictions:</strong> {property.restrictions.join(', ')}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Crops:</strong> {property.possibleCrops.join(', ')}</p>
                            <p className="text-xl text-gray-700 font-semibold mb-2">CAD ${property.price}/month</p>
                        </div>
                        {/* List of Renters */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 font-semibold mb-2"><strong>List of Renters:</strong></p>
                            <div className="bg-slate-200 rounded-lg shadow-md p-4 relative">
                                <div className="mb-2">
                                    <p className="text-sm text-gray-700 font-bold">Jill Mayer</p>
                                    <p className="text-sm text-gray-700">Rent Start: May 1, 2024</p>
                                    <p className="text-sm text-gray-700">Rent End: May 15, 2025</p>
                                </div>
                                    <button className="absolute bottom-2 right-2 text-sm font-semibold text-red-500 py-1 px-2">Cancel Renter</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
