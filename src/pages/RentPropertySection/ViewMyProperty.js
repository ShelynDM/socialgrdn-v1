import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import InAppLogo from "../../components/Logo/inAppLogo";
import BackButton from "../../components/Buttons/backButton";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { FaLocationDot } from "react-icons/fa6";

export default function ViewMyProperty() {
    const [property, setProperty] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const { id } = useParams(); // Get the property_id from the URL
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/getPropertyDetails?property_id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property details');
                }
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error('Error fetching property details:', error);
            }
        };

        fetchProperty();
    }, [id]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? property.images.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === property.images.length - 1 ? 0 : prevIndex + 1));
    };

    // Navigate to EditProperty page with the property ID
    const handleEditClick = () => {
        navigate(`/edit-property/${id}`); // Adjust the path as per your routing setup
    };

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-main-background relative'>
            <InAppLogo />
            <div className="flex flex-col items-center justify-center min-h-screen pb-20">
                {/* Back Button */}
                <div className="absolute top-4 left-4 z-10">
                    <BackButton onClick={() => navigate(-1)} /> {/* Navigate to the previous page */}
                </div>

                {/* Main Content */}
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        {/* Property Name and Button */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">{property.property_name}</h2>
                            <button 
                                onClick={handleEditClick} // Add onClick handler
                                className="text-lg font-bold text-green-600 py-2 px-4"
                            >
                                Edit
                            </button>
                        </div>
                        {/* Property Location and Zone */}
                        <div className="flex items-center mb-4">
                            <div className="flex items-center space-x-2 flex-grow">
                                <FaLocationDot className="text-xl text-gray-500" />
                                <p className="text-sm text-gray-700">{`${property.address_line1}, ${property.city}, ${property.province}, ${property.postal_code}`}</p>
                            </div>
                        </div>
                        {/* Property Image */}
                        <div className="relative mb-4">
                            <img
                                src={property.photo || 'https://via.placeholder.com/400x200'}
                                alt={property.property_name}
                                className="w-full h-60 object-cover rounded-md"
                            />
                        </div>
                        {/* Property Description */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 font-semibold mb-2"><strong>About property:</strong></p>
                            <p className="text-sm text-gray-700">{property.description}</p>
                        </div>
                        {/* Property Details */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 mb-2"><strong>Dimensions:</strong> {property.dimension}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Soil Type:</strong> {property.soil_type}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Amenities:</strong> {property.amenities ? property.amenities.join(', ') : 'N/A'}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Restrictions:</strong> {property.restrictions ? property.restrictions.join(', ') : 'N/A'}</p>
                            <p className="text-sm text-gray-700 mb-2"><strong>Crops:</strong> {property.crops ? property.crops.join(', ') : 'N/A'}</p>
                            <p className="text-xl text-gray-700 font-semibold mb-2">CAD ${property.rent_base_price}/month</p>
                        </div>
                        {/* Owner Information */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 font-semibold mb-2"><strong>Owner:</strong> {property.owner_username}</p>
                        </div>
                        {/* List of Renters */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700 font-semibold mb-2"><strong>List of Renters:</strong></p>
                            <p className="text-sm text-gray-700">No renters information available.</p>
                        </div>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
