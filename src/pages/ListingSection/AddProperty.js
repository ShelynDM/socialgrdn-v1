"use client"
import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import InAppLogo from "../../components/Logo/inAppLogo";
import BackButton from "../../components/Buttons/backButton";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";
import { storage } from '../../_utils/firebase';
import LongButton from '../../components/Buttons/longButton';

const AddProperty = () => {
    const [primaryImage, setPrimaryImage] = useState(null);
    const [otherImages, setOtherImages] = useState([]);
    const [primaryImageUrl, setPrimaryImageUrl] = useState('');
    const [otherImageUrls, setOtherImageUrls] = useState([]);
    const [primaryImageProgress, setPrimaryImageProgress] = useState(0);
    const [otherImagesProgress, setOtherImagesProgress] = useState([]);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [selectedZone, setSelectedZone] = useState({ value: "", color: "" });
    const [propertyId, setPropertyId] = useState('');

    useEffect(() => {
        const generatePropertyId = () => {
            const timestamp = Date.now().toString(36);
            const randomStr = Math.random().toString(36).substring(2, 8);
            return `PROP-${timestamp}-${randomStr}`.toUpperCase();
        };

        setPropertyId(generatePropertyId());
    }, []);

    const handlePrimaryImageChange = (e) => {
        if (e.target.files[0]) {
            setPrimaryImage(e.target.files[0]);
        }
    };

    const handleOtherImagesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setOtherImages(selectedFiles);
        setOtherImagesProgress(new Array(selectedFiles.length).fill(0));
    };

    const uploadPrimaryImage = () => {
        if (!primaryImage) return;

        const storageRef = ref(storage, `property-images/${propertyId}/primary-${primaryImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, primaryImage);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setPrimaryImageProgress(progress);
            },
            (error) => {
                console.error("Primary image upload error: ", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPrimaryImageUrl(downloadURL);
                    console.log('Primary image available at', downloadURL);
                });
            }
        );
    };

    const uploadOtherImages = () => {
        otherImages.forEach((image, index) => {
            const storageRef = ref(storage, `property-images/${propertyId}/other-${image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setOtherImagesProgress(prevProgress => {
                        const newProgress = [...prevProgress];
                        newProgress[index] = progress;
                        return newProgress;
                    });
                },
                (error) => {
                    console.error(`Other image upload error for ${image.name}: `, error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setOtherImageUrls(prevUrls => [...prevUrls, downloadURL]);
                        console.log(`Other image ${image.name} available at`, downloadURL);
                    });
                }
            );
        });
    };

    const handleToggle = () => {
        setIsLocationEnabled(!isLocationEnabled);
    };

    const handleZoneChange = (event) => {
        const selectedValue = event.target.value;
        const selectedColor = event.target.options[event.target.selectedIndex].style.backgroundColor;
        setSelectedZone({ value: selectedValue, color: selectedColor });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        formData.append('propertyId', propertyId);
        formData.append('primaryImageUrl', primaryImageUrl);
        otherImageUrls.forEach((url, index) => {
            formData.append(`otherImageUrl${index}`, url);
        });

        try {
            const response = await fetch('/api/addProperty', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success) {
                alert('Property added successfully!');
                // Redirect or perform any other action after successful submission
            } else {
                alert('Failed to add property.');
            }
        } catch (error) {
            console.error('Error adding property: ', error);
            alert('An error occurred while adding the property.');
        }
    };

    return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8" onSubmit={handleSubmit}>
                       

                        {/* Primary Image Upload */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold">Primary Image:</label>
                            <input
                                type="file"
                                onChange={handlePrimaryImageChange}
                                accept="image/*"
                                className="p-2 border border-gray-400 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={uploadPrimaryImage}
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Upload Primary Image
                            </button>
                            {primaryImageProgress > 0 && <p>Primary Image Upload Progress: {primaryImageProgress.toFixed(2)}%</p>}
                            {primaryImageUrl && (
                                <img src={primaryImageUrl} alt="Primary" className="w-full h-40 object-cover rounded-lg" />
                            )}
                        </div>

                        {/* Other Images Upload */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold">Other Images:</label>
                            <input
                                type="file"
                                onChange={handleOtherImagesChange}
                                accept="image/*"
                                multiple
                                className="p-2 border border-gray-400 rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={uploadOtherImages}
                                className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg"
                            >
                                Upload Other Images
                            </button>
                            {otherImagesProgress.map((progress, index) => (
                                <p key={index}>Other Image {index + 1} Upload Progress: {progress.toFixed(2)}%</p>
                            ))}
                            <div className="flex flex-wrap gap-2">
                                {otherImageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`Other ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold">Property ID:</label>
                            <input
                                type="text"
                                value={propertyId}
                                readOnly
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
                            />
                        </div>
                        
                        {/* Property Name */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold">Property Name:</label>
                            <input
                                type="text"
                                name="propertyName"
                                placeholder="Property Name"
                                className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>

                        {/* Property Location */}
                        <div className="flex flex-col gap-4">
                            <label htmlFor="address" className="text-lg font-semibold">Property Location:</label>
                            <input 
                                type="text" 
                                name="addressLine1"
                                placeholder="Address Line 1" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                name="city"
                                placeholder="City" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                name="province"
                                placeholder="Province" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                name="postalCode"
                                placeholder="Postal Code" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                            <input 
                                type="text" 
                                name="country"
                                placeholder="Country" 
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                            />
                        </div>

                        {/* Specific Location Toggle */}
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-start">
                                <h1 className="text-lg font-semibold">Show your specific location</h1>
                                <p className="text-sm">Your specific location will only be visible once a reservation is made.</p>
                            </div>
                            <div className="flex items-center">
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

                        {/* Farming Zone */}
                        <div className="flex items-center gap-4">
                            <label className="text-lg font-semibold" htmlFor="zone">Farming Zone:</label>
                            <select
                                id="farmingZone"
                                name="farmingZone"
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
                            </select>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold">Description:</label>
                            <textarea
                                name="description"
                                placeholder="Provide a detailed description of your property"
                                rows="3"
                                className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
                            ></textarea>
                        </div>

                        {/* Dimensions Fields */}
                        <div className="flex flex-col gap-4">
                            <label className="text-lg font-semibold" htmlFor="dimensions">Dimensions:</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="number" 
                                    name="length"
                                    placeholder="Length" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    name="width"
                                    placeholder="Width" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
                                />
                                <span className="text-lg font-semibold">x</span>
                                <input 
                                    type="number" 
                                    name="height"
                                    placeholder="Height" 
                                    className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500" 
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
};

export default AddProperty;
