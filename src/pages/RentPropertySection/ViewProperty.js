import React, { useState } from 'react'; 
import InAppLogo from "../components/inAppLogo";
import BackButton from "../components/backButton";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import { FaLocationDot } from "react-icons/fa6";
import SearchBar from "../components/searchbar";


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

export default function ViewProperty() {
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
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <SearchBar />
                    <div className="bg-white rounded-lg shadow-md p-4 mt-12">
                        {/* Property Name */}
                        <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
                        {/* Property Location and Zone */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center space-x-2 flex-grow">
                                <FaLocationDot className="text-xl text-gray-500" />
                                <p className="text-sm text-gray-700">{property.address}</p>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-green-200 rounded mr-2"></div>
                                <p className="text-sm text-gray-700 font-semibold">{property.zone}</p>
                            </div>
                        </div>
                        {/* Property Image with Indicator */}
                        <div className="relative mb-4">
                            <img
                                src={property.images[currentImageIndex]}
                                alt={property.name}
                                className="w-full h-48 object-cover rounded-md"
                            />
                            {property.images.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 text-xs text-gray-700">
                                    {currentImageIndex + 1}/{property.images.length}
                                </div>
                            )}
                            {property.images.length > 1 && (
                                <div className="absolute inset-0 flex items-center justify-between px-2">
                                    <button 
                                        onClick={handlePrevImage} 
                                        className="text-gray-700 bg-transparent p-2">
                                        &lt;
                                    </button>
                                    <button 
                                        onClick={handleNextImage} 
                                        className="text-gray-700 bg-transparent p-2">
                                        &gt;
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Property Description */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 font-semibold"><strong>About property:</strong></p>
                            <p className="text-sm text-gray-700">{property.description}</p>
                        </div>
                        {/* Property Details */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 mb-2"><strong>Dimensions:</strong> {property.dimension}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Soil Type:</strong> {property.soilType}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Amenities:</strong> {property.amenities.join(', ')}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Restrictions:</strong> {property.restrictions.join(', ')}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Crops:</strong> {property.possibleCrops.join(', ')}</p>
                        </div>
                        {/* Owner Info */}
                        <div className="flex items-center mt-6">
                            <p className="text-sm text-gray-700 mb-2"><strong>Owner:</strong> </p>
                            <img src={property.owner.image} alt="Owner" className="w-12 h-12 rounded-full mr-3 ml-3" />
                            <p className="text-sm text-gray-700 font-semibold">{property.owner.username}</p>
                        </div>
                    </div>
                    {/* Price and Button */}
                    <div className="flex items-center justify-between mt-4 mb-4">
                        <p className="text-xl text-gray-700 font-semibold">CAD ${property.price}/month</p>
                        <button className="bg-green-500 text-white rounded-md px-10 py-2">Check Calendar</button>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
