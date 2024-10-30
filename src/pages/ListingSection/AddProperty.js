/**
 * AddProperty.js
 * Description: Page for users to add a property listing
 * FrontEnd: Lilian Huh
 * BackEnd: Donald Uy
 * Date: 2024-10-23
 */

// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import InAppLogo from '../../components/Logo/inAppLogo';
import BackButton from '../../components/Buttons/backButton';
import NavBar from '../../components/Navbar/navbar';
import Sprout from '../../assets/navbarAssets/sprout.png';
import { storage } from '../../_utils/firebase';
import LongButton from '../../components/Buttons/longButton';
import { useUser } from '../../UserContext';
import AddressAutocomplete from '../../components/AutoComplete/AddressAutoComplete';

// Define AddProperty component
const AddProperty = () => {
	// Initialize state variables
	const { userId } = useUser(); // Get userId from UserContext
	const [primaryImage, setPrimaryImage] = useState(null);
	const [otherImages, setOtherImages] = useState([]);
	const [selectedZone, setSelectedZone] = useState({ value: '', color: '' });
	const [propertyId, setPropertyId] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [propertyName, setPropertyName] = useState('');
	const [addressLine1, setAddressLine1] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [country, setCountry] = useState('');
	const [description, setDescription] = useState('');
	const [length, setLength] = useState('');
	const [width, setWidth] = useState('');
	const [height, setHeight] = useState('');
	const [soilType, setSoilType] = useState('');
	const [amenities, setAmenities] = useState('');
	const [cropInput, setCropInput] = useState('');
	const [possibleCrops, setPossibleCrops] = useState([]);
	const [restrictions, setRestrictions] = useState('');
	const [price, setPrice] = useState('');

	// Generate a random property ID
	useEffect(() => {
		const generatePropertyId = () => {
			const randomNum = Math.floor(Math.random() * 100000);
			return `${randomNum}`;
		};
		// Set property ID
		setPropertyId(generatePropertyId());
		console.log('Current User ID:', userId);
	}, [userId]);

	// Handle primary image upload
	const handlePrimaryImageChange = (e) => {
		if (e.target.files[0]) {
			setPrimaryImage(e.target.files[0]);
		}
	};

	// Handle other images upload
	const handleOtherImagesChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setOtherImages(selectedFiles);
	};

	const handleAddressSelect = (addressData) => {
		setAddressLine1(addressData.addressLine1);
		setCity(addressData.city);
		setProvince(addressData.province);
		setPostalCode(addressData.postalCode);
		setCountry(addressData.country);
		setLatitude(addressData.latitude.toString());
		setLongitude(addressData.longitude.toString());
	};

	const handleZoneChange = (event) => {
		const selectedValue = event.target.value;
		const selectedColor =
			event.target.options[event.target.selectedIndex].style.backgroundColor;
		setSelectedZone({ value: selectedValue, color: selectedColor });
	};

	// Upload image to Firebase Storage
	const uploadImage = async (image, path) => {
		const storageRef = ref(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, image);

		// Return a promise to handle upload progress and completion
		return new Promise((resolve, reject) => {
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(`Upload progress: ${progress}%`);
				},
				(error) => {
					console.error('Image upload error: ', error);
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						console.log('Image available at', downloadURL);
						resolve(downloadURL);
					});
				}
			);
		});
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			// Debugging logs
			console.log('UserId:', userId);
			console.log('Primary Image:', primaryImage);
			console.log('Other Images:', otherImages);
			console.log('Selected Zone:', selectedZone);
			console.log('Property ID:', propertyId);
			console.log('Latitude:', latitude, 'Longitude:', longitude);
			console.log('Property Name:', propertyName);
			console.log('Address Line 1:', addressLine1);
			console.log(
				'City:',
				city,
				'Province:',
				province,
				'Postal Code:',
				postalCode,
				'Country:',
				country
			);
			console.log('Description:', description);
			console.log(
				'Dimensions - Length:',
				length,
				'Width:',
				width,
				'Height:',
				height
			);
			console.log('Soil Type:', soilType);
			console.log('Amenities:', amenities);
			console.log('Possible Crops:', possibleCrops);
			console.log('Restrictions:', restrictions);
			console.log('Price:', price);
			if (!primaryImage) {
				throw new Error('Primary image is required');
			}

			// Upload primary image
			const primaryImageUrl = await uploadImage(
				primaryImage,
				`property-images/${propertyId}/PrimaryPhoto/primary-${primaryImage.name}`
			);

			// Upload other images
			const otherImageUrls = await Promise.all(
				otherImages.map((image, index) =>
					uploadImage(
						image,
						`property-images/${propertyId}/OtherImages/other-${image.name}`
					)
				)
			);

			// Collect form data
			const formData = {
				userId: parseInt(userId), // Ensure userId is a number
				propertyId: parseInt(propertyId),
				propertyName,
				addressLine1,
				city,
				province,
				postalCode,
				country,
				latitude: parseFloat(latitude),
				longitude: parseFloat(longitude),
				growthzone: selectedZone.value,
				description,
				length: parseFloat(length),
				width: parseFloat(width),
				height: parseFloat(height),
				soilType,
				amenities,
				possibleCrops: possibleCrops,
				restrictions,
				price: parseFloat(price),
				primaryImageUrl,
				otherImageUrls,
			};

			console.log('Form Data:', formData);

			// Send all data in a single request
			const response = await fetch('/api/addPropertyListing', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Failed to save property details');
			}

			const result = await response.json();
			console.log(result);

			console.log('Property added successfully!');
			return true;

			// Redirect or perform any other action after successful submission
		} catch (error) {
			console.error('Error adding property: ', error);
			return false;
		}
	};

	return (
		<div className="bg-main-background relative">
			<div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-6 bg-main-background">
				<div className="px-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background">
					<InAppLogo />
				</div>
				<div className="fixed top-10 flex w-full justify-between bg-main-background">
					<div className="flex-grow w-full">
						<BackButton />
					</div>
				</div>

				<div className="px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-20 mt-20">
					<form
						className="flex flex-col flex-grow w-full gap-4 mb-8"
						onSubmit={handleSubmit}
					>
						{/* Primary Image Upload */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold">Primary Image:</label>
							<input
								type="file"
								onChange={handlePrimaryImageChange}
								accept="image/*"
								className="p-2 border border-gray-400 rounded-lg"
								required
							/>
							{primaryImage && (
								<img
									src={URL.createObjectURL(primaryImage)}
									alt="Primary"
									className="w-full h-40 object-cover rounded-lg"
								/>
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
							<div className="flex flex-wrap gap-2">
								{otherImages.map((image, index) => (
									<img
										key={index}
										src={URL.createObjectURL(image)}
										alt={`Other ${index + 1}`}
										className="w-20 h-20 object-cover rounded-lg"
									/>
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
								value={propertyName}
								onChange={(e) => setPropertyName(e.target.value)}
								placeholder="Property Name"
								className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								required
							/>
						</div>

						{/* Property Location */}
						<div className="flex flex-col gap-4">
							<label htmlFor="address" className="text-lg font-semibold">
								Property Location:
							</label>

							<AddressAutocomplete
								onAddressSelect={handleAddressSelect}
								resultLimit={20}
								countryCodes={['ca']} // Canada only
							/>

							<input
								type="text"
								value={addressLine1}
								readOnly
								placeholder="Address Line 1"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>

							<input
								type="text"
								value={city}
								readOnly
								placeholder="City"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>

							<input
								type="text"
								value={province}
								readOnly
								placeholder="Province"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>

							<input
								type="text"
								value={postalCode}
								readOnly
								placeholder="Postal Code"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>

							<input
								type="text"
								value={country}
								readOnly
								placeholder="Country"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>

							<input type="hidden" value={latitude} required step="any" />

							<input type="hidden" value={longitude} required step="any" />
						</div>

						{/* Farming Zone */}
						<div className="flex items-center gap-4">
							<label className="text-lg font-semibold" htmlFor="zone">
								Farming Zone:
							</label>
							<select
								id="growth_zone"
								name="growth_zone"
								className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								onChange={handleZoneChange}
								value={selectedZone.value}
								style={{
									backgroundColor: selectedZone.color,
									color: '#000000',
								}}
								required
							>
								<option value="">Select a zone</option>
								<option value="0a" style={{ backgroundColor: '#d7bde2' }}>
									0a
								</option>
								<option value="0b" style={{ backgroundColor: '#c39bd3' }}>
									0b
								</option>
								<option value="1a" style={{ backgroundColor: '#7fb3d5' }}>
									1a
								</option>
								<option value="1b" style={{ backgroundColor: '#a9cce3' }}>
									1b
								</option>
								<option value="2a" style={{ backgroundColor: '#a3e4d7' }}>
									2a
								</option>
								<option value="2b" style={{ backgroundColor: '#7dcea0' }}>
									2b
								</option>
								<option value="3a" style={{ backgroundColor: '#28b463' }}>
									3a
								</option>
								<option value="3b" style={{ backgroundColor: '#a9dfbf' }}>
									3b
								</option>
							</select>
						</div>

						{/* Description */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold">Description:</label>
							<textarea
								name="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Provide a detailed description of your property"
								rows="3"
								className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								required
							></textarea>
						</div>

						{/* Dimensions Fields */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold" htmlFor="dimensions">
								Dimensions:
							</label>
							<div className="flex items-center gap-2">
								<input
									type="number"
									name="length"
									value={length}
									onChange={(e) => setLength(e.target.value)}
									placeholder="Length"
									className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									required
								/>
								<span className="text-lg font-semibold">x</span>
								<input
									type="number"
									name="width"
									value={width}
									onChange={(e) => setWidth(e.target.value)}
									placeholder="Width"
									className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									required
								/>
								<span className="text-lg font-semibold">x</span>
								<input
									type="number"
									name="height"
									value={height}
									onChange={(e) => setHeight(e.target.value)}
									placeholder="Height"
									className="w-1/3 p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									required
								/>
								<span className="text-lg font-semibold">ft</span>
							</div>
						</div>

						<div className="flex items-center gap-4">
							<label className="text-lg font-semibold" htmlFor="soilType">
								Type of Soil:
							</label>
							<select
								id="soilType"
								onChange={(e) => setSoilType(e.target.value)}
								className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								required
							>
								<option value="" disabled selected>
									Select soil type
								</option>
								<option value="Loamy">Loamy</option>
								<option value="Clay">Clay</option>
								<option value="Sandy">Sandy</option>
								<option value="Silty">Silty</option>
								<option value="Chalk">Chalk</option>
								<option value="Peat">Peat</option>
							</select>
						</div>

						<div className="flex items-center gap-4">
							<label className="text-lg font-semibold" htmlFor="amenities">
								Amenities:
							</label>
							<input
								type="text"
								value={amenities}
								onChange={(e) => setAmenities(e.target.value)}
								placeholder="e.g. Shed, Electricity, Fencing"
								id="amenities"
								className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
							/>
						</div>

						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold" htmlFor="possibleCrops">
								Possible Crops:
							</label>
							<div className="space-y-4">
								<div className="flex items-center ">
									<input
										type="text"
										value={cropInput}
										onChange={(e) => setCropInput(e.target.value)}
										onKeyPress={(e) => {
											if (e.key === 'Enter') {
												e.preventDefault();
												if (cropInput.trim()) {
													setPossibleCrops([
														...possibleCrops,
														cropInput.trim(),
													]);
													setCropInput('');
												}
											}
										}}
										placeholder="e.g. Carrot, Barley, Corn"
										id="possibleCrops"
										className="mr-2 flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									/>

									{/* Add More Button */}
									<button
										type="button"
										onClick={() => {
											if (cropInput.trim()) {
												setPossibleCrops([...possibleCrops, cropInput.trim()]);
												setCropInput('');
											}
										}}
										className="text-base text-green-600 hover:text-green-700 focus:outline-none font-bold"
									>
										+ Add
									</button>
								</div>

								{/* Display added crops */}
								<div className="flex flex-wrap gap-2">
									{possibleCrops.map((crop, index) => (
										<div
											key={index}
											className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full"
										>
											<span>{crop}</span>
											<button
												type="button"
												onClick={() => {
													setPossibleCrops(
														possibleCrops.filter((_, i) => i !== index)
													);
												}}
												className="text-green-600 hover:text-green-700 focus:outline-none"
											>
												×
											</button>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold" htmlFor="restrictions">
								Restrictions:
							</label>
							<textarea
								id="restrictions"
								value={restrictions}
								onChange={(e) => setRestrictions(e.target.value)}
								placeholder="e.g. No pets, No smoking, No planting marijuana"
								className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								rows="3"
							/>
						</div>

						<div className="flex items-center gap-4">
							<label className="text-lg font-semibold" htmlFor="price">
								Price:
							</label>

							<h1 className="text-lg font-semibold  ">$</h1>
							<input
								type="number"
								placeholder="CAD"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								id="price"
								className="flex-grow  p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
							/>
							<h1 className="text-lg font-semibold">/month</h1>
						</div>

						<h1 className="text-lg font-normal">
							By publishing your listing, you agree to the{' '}
							<strong>Terms, Conditions and Privacy Policy</strong>.
						</h1>
						<LongButton
							buttonName="Publish Listing"
							className="w-full rounded shadow-lg bg-green-500 text-white font-bold"
							type="button" // Change to button type
							onClick={async (e) => {
								e.preventDefault();
								const success = await handleSubmit(e);
								if (success) {
									window.location.href = '/ListingConfirmation';
								}
							}}
						/>
					</form>
				</div>
			</div>
			<NavBar ProfileColor="#00B761" SproutPath={Sprout} />
		</div>
	);
};

export default AddProperty;
