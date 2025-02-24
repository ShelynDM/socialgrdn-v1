/**
 * AddProperty.js
 * Description: Page for users to add a property listing
 * FrontEnd: Lilian Huh
 * BackEnd: Donald Jans Uy
 * Date: 2024-10-23
 */

// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, onValue } from 'firebase/database';
import { storage, realtimeDb } from '../../_utils/firebase';
import InAppLogo from '../../components/Logo/inAppLogo';
import BackButton from '../../components/Buttons/backButton';
import NavBar from '../../components/Navbar/navbar';
import LongButton from '../../components/Buttons/longButton';
import AddressAutocomplete from '../../components/AutoComplete/AddressAutoComplete';
import zoneColor from '../../components/ZoneColor/zoneColor';
import Sprout from '../../assets/navbarAssets/sprout.png';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';

// AddProperty component
const AddProperty = () => {
	// State variables
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
	const [cityZoneData, setCityZoneData] = useState({});

	//Function to handle the check condition for number of digits
	const handlePriceChange = (e) => {
		const value = e.target.value;
		if (value.length > 7) {
			setPropertyPriceErrorMsg('Price cannot exceed 7 digits');
			setPrice(value.slice(0, 7));
		} else {
			setPropertyPriceErrorMsg('');
			setPrice(value);
		}
	};

	// Combine both effects into one organized effect
	useEffect(() => {
		// Property ID generation
		const generatePropertyId = () => {
			const randomNum = Math.floor(Math.random() * 100000);
			return `${randomNum}`;
		};

		setPropertyId(generatePropertyId());
		console.log('Current User ID:', userId);

		// City zone data fetching
		const dataRef = databaseRef(realtimeDb, 'cities');
		const unsubscribe = onValue(dataRef, (snapshot) => {
			try {
				const fetchedData = snapshot.val();
				setCityZoneData(fetchedData);
			} catch (err) {
				console.error('Error processing city zone data:', err);
			}
		});

		// Cleanup function
		return () => {
			unsubscribe();
		};
	}, [userId]); // Include both dependencies

	const handlePrimaryImageChange = (e) => {
		if (e.target.files[0]) {
			setPrimaryImage(e.target.files[0]);
		}
	};

	// Navigation hook
	const navigate = useNavigate();

	// Handle other images change
	const handleOtherImagesChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setOtherImages(selectedFiles);
	};

	// Handle address selection
	const handleAddressSelect = (addressData) => {
		if (addressData.province === 'Alberta') {
			setAddressLine1(addressData.addressLine1);
			setCity(addressData.city);
			setProvince(addressData.province);
			setPostalCode(addressData.postalCode);
			setCountry(addressData.country);
			setLatitude(addressData.latitude.toString());
			setLongitude(addressData.longitude.toString());

			// Auto-select zone based on city
			const cityEntry = Object.entries(cityZoneData).find(
				([, data]) => data.name.toLowerCase() === addressData.city.toLowerCase()
			);

			if (cityEntry) {
				const [, cityData] = cityEntry;
				setSelectedZone({
					value: cityData.code,
					color: zoneColor(cityData.code),
				});
			}
		} else {
			// set it to blank if its error
			setAddressLine1('');
			setCity('');
			setProvince('');
			setPostalCode('');
			setCountry('');
			setLatitude('');
			setLongitude('');
			setSelectedZone({
				value: '',
				color: '',
			});
			setAddressErrorMsg('ERROR: Please select an address in Alberta');
		}
	};

	// Image upload function
	const uploadImage = async (image, path) => {
		const storageRef = ref(storage, path);
		const uploadTask = uploadBytesResumable(storageRef, image);

		// Return a promise to handle the upload task
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
	const [imageErrorMsg, setImageErrorMsg] = useState('');
	const [propertyNameErrorMsg, setPropertyNameErrorMsg] = useState('');
	const [propertyPriceErrorMsg, setPropertyPriceErrorMsg] = useState('');
	const [addressErrorMsg, setAddressErrorMsg] = useState('');
	const [dimensionErrorMsg, setDimensionErrorMsg] = useState('');
	const [soilTypeErrorMsg, setSoilTypeErrorMsg] = useState('');
	const [possibleCropsErrorMsg, setPossibleCropsErrorMsg] = useState('');

	// Form validation function
	const formValidation = () => {
		let isValid = true;
		if (!primaryImage) {
			setImageErrorMsg('Primary image is required');
			isValid = false;
		} else {
			setImageErrorMsg('');
		}
		if (!propertyName) {
			setPropertyNameErrorMsg('Property name is required');
			isValid = false;
		} else {
			setPropertyNameErrorMsg('');
		}
		if (!addressLine1) {
			setAddressErrorMsg('Please select an address in Alberta');
			isValid = false;
		} else {
			setAddressErrorMsg('');
		}
		if (!length || !width || !height) {
			setDimensionErrorMsg('Dimensions are required');
			isValid = false;
		} else {
			setDimensionErrorMsg('');
		}
		if (!soilType) {
			setSoilTypeErrorMsg('Soil type is required');
			isValid = false;
		} else {
			setSoilTypeErrorMsg('');
		}
		if (possibleCrops.length === 0) {
			setPossibleCropsErrorMsg('Possible crops are required');
			isValid = false;
		} else {
			setPossibleCropsErrorMsg('');
		}
		if (!price) {
			setPropertyPriceErrorMsg('Price is required');
			isValid = false;
		} else {
			setPropertyPriceErrorMsg('');
		}
		return isValid;
	};

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		let isValid = formValidation();
		if (!isValid) {
			return false;
		}
		try {
			// Debugging logs
			console.log('UserId:', userId);
			console.log('Primary Image:', primaryImage);
			console.log('Other Images:', otherImages);
			console.log('Property ID:', propertyId);
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
			console.log('Latitude:', latitude, 'Longitude:', longitude);
			console.log('Selected Zone:', selectedZone);
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
				//throw new Error('Primary image is required');
				console.log('Primary image is required');
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

			return result.propertyId;

			// Redirect or perform any other action after successful submission
		} catch (error) {
			console.error('Error adding property: ', error);
			return false;
		}
	};

	// Modified Zone selection section in your form
	const renderZoneSection = () => (
		<div className="flex items-center gap-4">
			<label className="text-lg font-semibold" htmlFor="zone">
				Growth Zone:
			</label>
			<div className="flex-grow relative">
				<div className="w-full">
					{selectedZone.value ? (
						<div
							className="w-full p-2 border border-gray-400 rounded-lg shadow-lg"
							style={{
								backgroundColor: selectedZone.color,
								color: '#000000',
							}}
						>
							{selectedZone.value}
						</div>
					) : (
						<div className="w-full p-2 border border-gray-400 rounded-lg shadow-lg text-gray-500">
							Zone
						</div>
					)}
				</div>
			</div>
		</div>
	);

	// Return the JSX for the AddProperty component
	return (
		<div className="bg-main-background relative">
			<div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-2 pb-20 mt-14 bg-main-background ">
				<div className="px-2 fixed top-0 left-0 w-auto sm:w-2/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-main-background ">
					<InAppLogo />
				</div>
				<div className="fixed top-10 flex w-full justify-between bg-main-background ">
					<div className="flex-grow w-full">
						<BackButton />
					</div>
				</div>
				<div className="mt-4">
					<p className="text-2xl font-bold text-center">Add your property</p>
				</div>

				<div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
					<form
						className="flex flex-col flex-grow w-full gap-4 mb-8"
						onSubmit={handleSubmit}
					>
						{/* Primary Image Upload */}
						<div>
							<p className="text-sm text-red-600">{imageErrorMsg}</p>
						</div>
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
						<div>
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
							<div className="pl-36">
								<p className="text-sm text-red-600">{propertyNameErrorMsg}</p>
							</div>
						</div>

						{/* Property Price */}
						<div>
							<div className="flex items-center gap-4">
								<label className="text-lg font-semibold" htmlFor="price">
									Price:
								</label>
								<h1 className="text-lg font-semibold  ">$</h1>
								<input
									type="number"
									placeholder="CAD"
									value={price}
									onChange={handlePriceChange}
									id="price"
									className="flex-grow  p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									required
								/>
								<h1 className="text-lg font-semibold">/month</h1>
							</div>
							<div className="pl-24">
								<p className="text-sm text-red-600">{propertyPriceErrorMsg}</p>
							</div>
						</div>

						{/* Property Location */}
						<div className="flex flex-col gap-4">
							<label htmlFor="address" className="text-lg font-semibold">
								Property Location:
							</label>
							<div className="flex items-center gap-4">
								<label className="text-sm font-semibold">Enter Address</label>
								<p className="text-sm text-red-600">{addressErrorMsg}</p>
							</div>
							<AddressAutocomplete
								onAddressSelect={handleAddressSelect}
								resultLimit={20}
								countryCodes={['ca']} // Canada only
							/>
							<label className="text-sm font-semibold">Address Line 1</label>
							<input
								type="text"
								value={addressLine1}
								readOnly
								placeholder="Address Line 1"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>
							<label className="text-sm font-semibold">City</label>
							<input
								type="text"
								value={city}
								readOnly
								placeholder="City"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>
							<label className="text-sm font-semibold">Province</label>
							<input
								type="text"
								value={province}
								readOnly
								placeholder="Province"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-gray-100"
							/>
							<label className="text-sm font-semibold">Postal Code</label>
							<input
								type="text"
								value={postalCode}
								onChange={(e) => setPostalCode(e.target.value)}
								placeholder="Postal Code"
								className="p-2 border border-gray-400 rounded-lg shadow-lg bg-white"
							/>
							<label className="text-sm font-semibold">Country</label>
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
						<div className="flex items-center gap-4">{renderZoneSection()}</div>

						{/* Description */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold">
								Description(optional):
							</label>
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
							<div className="flex items-center gap-4">
								<label className="text-lg font-semibold" htmlFor="dimensions">
									Dimensions:
								</label>
								<p className="text-sm text-red-600">{dimensionErrorMsg}</p>
							</div>
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
						{/* Soil Type */}
						<div>
							<div className="flex items-center gap-4">
								<label className="text-lg font-semibold" htmlFor="soilType">
									Type of Soil:
								</label>

								<select
									id="soilType"
									value={soilType}
									onChange={(e) => setSoilType(e.target.value)}
									className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
									required
								>
									<option value="" disabled>
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
							<div className="pl-28">
								<p className="text-sm text-red-600">{soilTypeErrorMsg}</p>
							</div>
						</div>

						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-4">
								<label
									className="text-lg font-semibold"
									htmlFor="possibleCrops"
								>
									Possible Crops:
								</label>
								<p className="text-sm text-red-600">{possibleCropsErrorMsg}</p>
							</div>

							<div className="space-y-4">
								<div className="flex items-center gap-4">
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
										className="flex-grow p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
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
										className="px-4 py-2 text-sm text-green-600 hover:text-green-700 focus:outline-none"
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
						{/* Amenities */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold" htmlFor="amenities">
								Amenities(optional):
							</label>
							<textarea
								id="restrictions"
								value={amenities}
								onChange={(e) => setAmenities(e.target.value)}
								placeholder="e.g. Shed, Electricity, Fencing"
								className="p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500"
								rows="2"
							/>
						</div>
						{/* Restrictions */}
						<div className="flex flex-col gap-4">
							<label className="text-lg font-semibold" htmlFor="restrictions">
								Restrictions(optional):
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

						<h1 className="text-lg font-normal">
							By publishing your listing, you agree to the{' '}
							<strong>Terms, Conditions and Privacy Policy</strong>.
						</h1>
						<LongButton
							buttonName="Publish Listing"
							className="w-full rounded shadow-lg bg-green-500 text-white font-bold"
							type="button"
							onClick={async (e) => {
								e.preventDefault();
								const propertyId = await handleSubmit(e);
								if (propertyId) {
									navigate(`/ListingConfirmation/${propertyId}`);
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
