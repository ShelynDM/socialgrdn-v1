/**
 * EditProperty.js
 * Description: This page is Edit Property page where user can edit the property details.
 * FrontEnd: Lilian Huh
 *BackEnd: Donald Uy
 * Date: 2024-10-23
 */

import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from 'react-router-dom';
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import LongButton from "../../components/Buttons/longButton";
import BackButton from "../../components/Buttons/backButton";
import { storage } from '../../_utils/firebase';
import { useUser } from '../../UserContext';

const Alert = ({ children }) => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      {children}
    </div>
);

const EditProperty = () => {
    const navigate = useNavigate();
    const { userId } = useUser();
    const { id: propertyId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    // Form state with data types
    const [formData, setFormData] = useState({
        propertyName: '',
        addressLine1: '',
        city: '',
        province: '',
        postalCode: '',
        country: '',
        latitude: '',
        longitude: '',
        description: '',
        length: '',
        width: '',
        height: '',
        soilType: '',
        amenities: '',
        possibleCrops: '',
        restrictions: '',
        price: '',
        selectedZone: { value: "", color: "" }
    });

    // Image state
    const [primaryImage, setPrimaryImage] = useState(null);
    const [primaryImageUrl, setPrimaryImageUrl] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [otherImageUrls, setOtherImageUrls] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    
    useEffect(() => {
        const fetchPropertyData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/getPropertyDetails?property_id=${propertyId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch property data');
                }
                const data = await response.json();
                
                const dimensions = data.dimension ? data.dimension.split('x').map(d => d.trim()) : ['', '', ''];
                const [length, width, height] = dimensions;

                setFormData({
                    propertyName: data.property_name || '',
                    addressLine1: data.address_line1 || '',
                    city: data.city || '',
                    province: data.province || '',
                    postalCode: data.postal_code || '',
                    country: data.country || '',
                    latitude: data.latitude || '',
                    longitude: data.longitude || '',
                    description: data.description || '',
                     length: length.replace(' L', '') || '',
                    width: width.replace(' W', '') || '',
                    height: height.replace(' H', '') || '',
                    soilType: data.soil_type || '',
                    amenities: Array.isArray(data.amenities) ? data.amenities.join(', ') : data.amenities || '',
                    possibleCrops: Array.isArray(data.crops) ? data.crops.join(', ') : data.crops || '',
                    restrictions: Array.isArray(data.restrictions) ? data.restrictions.join(', ') : data.restrictions || '',
                    price: data.rent_base_price || '',
                    selectedZone: { 
                        value: data.growth_zone || '', 
                        // color: zoneColors[data.growth_zone] || '' 
                    }
                });

                setPrimaryImageUrl(data.primaryImage || '');
                setOtherImageUrls(data.otherImages || []);
            } catch (error) {
                console.error('Error fetching property data:', error);
                setError('Failed to load property data. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        if (propertyId) {
            fetchPropertyData();
        }
    }, [propertyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleZoneChange = (event) => {
        const selectedValue = event.target.value;
        setFormData(prev => ({
            ...prev,
            selectedZone: {
                value: selectedValue,
                // color: zoneColors[selectedValue]
            }
        }));
    };

    const handlePrimaryImageChange = (e) => {
        if (e.target.files[0]) {
            setPrimaryImage(e.target.files[0]);
            setPrimaryImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleOtherImagesChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setOtherImages(prev => [...prev, ...newFiles]);
        const newUrls = newFiles.map(file => URL.createObjectURL(file));
        setOtherImageUrls(prev => [...prev, ...newUrls]);
    };

    const handleRemoveOtherImage = (index) => {
        const urlToRemove = otherImageUrls[index];
        setOtherImageUrls(prev => prev.filter((_, i) => i !== index));
        setImagesToDelete(prev => [...prev, urlToRemove]);
    };

    const uploadImage = async (image, path) => {
        if (!image) return null;
        
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, image);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload progress: ${progress}%`);
                },
                (error) => {
                    console.error("Image upload error: ", error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(resolve);
                }
            );
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSaving(true);
        setError(null);
    
        try {
            let finalPrimaryImageUrl = primaryImageUrl;
            if (primaryImage) {
                finalPrimaryImageUrl = await uploadImage(
                    primaryImage,
                    `property-images/${propertyId}/primary-${Date.now()}`
                );
            }
    
            const newOtherImageUrls = await Promise.all(
                otherImages.map((image, index) =>
                    uploadImage(image, `property-images/${propertyId}/other-${Date.now()}-${index}`)
                )
            );
    
            const finalOtherImageUrls = [
                ...otherImageUrls.filter(url => !imagesToDelete.includes(url)),
                ...newOtherImageUrls.filter(Boolean)
            ];
    
            const submitData = {
                userId: parseInt(userId),
                propertyId: parseInt(propertyId),
                propertyName: formData.propertyName,
                addressLine1: formData.addressLine1,
                city: formData.city,
                province: formData.province,
                postalCode: formData.postalCode,
                country: formData.country,
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                growthzone: formData.selectedZone.value,
                description: formData.description,
                dimensions_length: parseInt(formData.length),
                dimensions_width: parseInt(formData.width),
                dimensions_height: parseInt(formData.height),
                soilType: formData.soilType,
                amenities: formData.amenities.split(',').map(item => item.trim()).filter(Boolean),
                restrictions: formData.restrictions.split(',').map(item => item.trim()).filter(Boolean),
                price: parseFloat(formData.price),
                primaryImageUrl: finalPrimaryImageUrl,
                otherImageUrls: finalOtherImageUrls,
            };
    
            console.log('Submitting data:', submitData);
    
            const response = await fetch(`/api/updateProperty/${propertyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData),
            });
    
            // First, get the response data
            const data = await response.text();
            console.log('Raw server response:', data);
    
            // Try to parse it as JSON
            let result;
            try {
                result = JSON.parse(data);
            } catch (e) {
                throw new Error('Server returned invalid JSON: ' + data);
            }
    
            // Check if response was ok
            if (!response.ok) {
                throw new Error(result.message || 'Failed to update property');
            }
    
            console.log('Update successful:', result);
            navigate('/ViewMyProperty/' + propertyId);
        } catch (error) {
            console.error('Error updating property:', error);
            setError('Failed to update property: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };
    
    if (isLoading) {
        return (
            <div className="min-h-screen bg-main-background flex items-center justify-center">
                <div className="animate-pulse text-gray-600">Loading property details...</div>
            </div>
        );
    }

    return (
        <div className="bg-main-background relative min-h-screen">
            <InAppLogo />
            <div className="absolute top-4 left-4 z-10">
                <BackButton onClick={() => navigate(-1)} />
            </div>

            <div className="flex flex-col items-center justify-center pb-20 pt-16">
                <div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                        {error && (
                            <Alert>
                                <p>{error}</p>
                            </Alert>
                        )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Images Section */}
                        <section className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-lg font-semibold">Primary Image</label>
                                <input
                                    type="file"
                                    onChange={handlePrimaryImageChange}
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                {primaryImageUrl && (
                                    <img 
                                        src={primaryImageUrl} 
                                        alt="Primary" 
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg font-semibold">Other Images</label>
                                <input
                                    type="file"
                                    onChange={handleOtherImagesChange}
                                    accept="image/*"
                                    multiple
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                />
                                <div className="grid grid-cols-3 gap-2">
                                    {otherImageUrls.map((url, index) => (
                                        <div key={index} className="relative">
                                            <img 
                                                src={url} 
                                                alt={`Other ${index + 1}`} 
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveOtherImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Basic Information */}
                        <section className="space-y-4">
                            <div>
                                <label className="block text-lg font-semibold">Property Name</label>
                                <input
                                    type="text"
                                    name="propertyName"
                                    value={formData.propertyName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-lg font-semibold">Location</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={formData.addressLine1}
                                    onChange={handleInputChange}
                                    placeholder="Address Line 1"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    name="province"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    placeholder="Province"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleInputChange}
                                    placeholder="Postal Code"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                 <input 
                                type="text" 
                                name="country"
                                value={formData.country}
                                onChange= {handleInputChange}
                                placeholder="Country" 
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            />
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleInputChange}
                                        placeholder="Latitude"
                                        step="any"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                    <input
                                        type="number"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleInputChange}
                                        placeholder="Longitude"
                                        step="any"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>
                        </section>
    
                        {/* Farming Zone */}
                        <section className="space-y-4">
                            <div>
                                <label className="block text-lg font-semibold">Farming Zone</label>
                                <select
                                    name="selectedZone"
                                    value={formData.selectedZone.value}
                                    onChange={handleZoneChange}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    style={{ backgroundColor: formData.selectedZone.color, color: '#000000' }}
                                    required
                                >
                                    <option value="">Select a zone</option>
                                    <option value="0a" style={{ backgroundColor: '#d7bde2' }}>0a</option>
                                    <option value="0b" style={{ backgroundColor: '#c39bd3' }}>0b</option>
                                    <option value="1a" style={{ backgroundColor: '#7fb3d5' }}>1a</option>
                                    <option value="1b" style={{ backgroundColor: '#a9cce3' }}>1b</option>
                                    <option value="2a" style={{ backgroundColor: '#a3e4d7' }}>2a</option>
                                    <option value="2b" style={{ backgroundColor: '#7dcea0' }}>2b</option>
                                    <option value="3a" style={{ backgroundColor: '#28b463' }}>3a</option>
                                    <option value="3b" style={{ backgroundColor: '#a9dfbf' }}>3b</option>
                                </select>
                            </div>
                        </section>
    
                        {/* Description */}
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Provide a detailed description of your property"
                                rows="3"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                required
                            ></textarea>
                        </div>
    
                        {/* Dimensions Fields */}
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Dimensions:</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    name="length"
                                    value={formData.length}
                                    onChange={handleInputChange}
                                    placeholder="Length" 
                                    className="w-1/3 p-2 border border-gray-300 rounded-lg" 
                                    required
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    name="width"
                                    value={formData.width}
                                    onChange={handleInputChange}
                                    placeholder="Width" 
                                    className="w-1/3 p-2 border border-gray-300 rounded-lg" 
                                    required
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    name="height"
                                    value={formData.height}
                                    onChange={handleInputChange}
                                    placeholder="Height" 
                                    className="w-1/3 p-2 border border-gray-300 rounded-lg" 
                                    required
                                />
                                <span className="text-lg font-semibold">ft</span>
                            </div>
                        </div>
    
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Type of Soil:</label>
                            <input 
                                type="text" 
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleInputChange}
                                placeholder="e.g. Clay, Loam, Sand" 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                                required
                            />
                        </div>
    
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Amenities:</label>
                            <input 
                                type="text" 
                                name="amenities"
                                value={formData.amenities}
                                onChange={handleInputChange}
                                placeholder="e.g. Shed, Electricity, Fencing" 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                            />
                        </div>
    
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Possible Crops:</label>
                            <input 
                                type="text" 
                                name="possibleCrops"
                                value={formData.possibleCrops}
                                onChange={handleInputChange}
                                placeholder="e.g. Carrot, Barley, Corn" 
                                className="w-full p-2 border border-gray-300 rounded-lg" 
                            />
                        </div>
    
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Restrictions:</label>
                            <textarea
                                name="restrictions"
                                value={formData.restrictions}
                                onChange={handleInputChange}
                                placeholder="e.g. No pets, No smoking, No planting marijuana" 
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                rows="3"
                            />
                        </div>
    
                        <div className="space-y-2">
                            <label className="block text-lg font-semibold">Price:</label>
                            <div className="flex items-center">
                                <span className="text-lg font-semibold mr-2">$</span>
                                <input 
                                    type="number" 
                                    name="price"
                                    placeholder="CAD" 
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="flex-grow p-2 border border-gray-300 rounded-lg" 
                                />
                                <span className="text-lg font-semibold ml-2">/month</span>
                            </div>
                        </div>
    
                        <p className="text-sm text-gray-600">
                            By saving changes, you agree to the <strong>Terms, Conditions and Privacy Policy</strong>.
                        </p>
                        
                        <LongButton
                            buttonName={isSaving ? "Saving..." : "Save Changes"}
                            className={`w-full rounded shadow-lg ${
                                isSaving ? 'bg-green-400' : 'bg-green-500'
                            } text-white font-bold`}
                            type="submit"
                            disabled={isSaving}
                        />
                    </form>
                </div>
            </div>
            <NavBar ProfileColor="#00B761" SproutPath={Sprout} />
        </div>
    );
}

export default EditProperty;