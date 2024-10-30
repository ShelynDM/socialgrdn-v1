/**
 * SearchBar.js
 * Description: Component that displays a search bar with a search icon.
 * Frontend Author: Shelyn Del Mundo
 * Backend Author: Shelyn Del Mundo
 *                  Donald Jans Uy
 * Date: 2024-10-23
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../_utils/firebase';
import logo from '../../assets/logo/SocialGrdnLogo.png';
import LongButton from '../../components/Buttons/longButton';
import AddressAutocomplete from '../../components/AutoComplete/AddressAutoComplete';

export default function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: '',
        profession: '',
        phoneNumber: '',
        userAddress: '',
        userCity: '',
        userProvince: '',
        userPostalCode: '',
    });

    const [errors, setErrors] = useState({});
    const [emailMessage, setEmailMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressSelect = (addressData) => {
        setFormData(prevState => ({
            ...prevState,
            userAddress: addressData.addressLine1,
            userCity: addressData.city,
            userProvince: addressData.province,
            userPostalCode: addressData.postalCode,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const { email, password, firstname, lastname, username, profession, phoneNumber } = formData;

        if (!email.includes('@') || !email.includes('.')) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (password.length < 6 || !/\d/.test(password)) {
            newErrors.password = 'Password must be at least 6 characters long and contain a number.';
        }
        if (!firstname.match(/^[a-zA-Z\s]+$/)) {
            newErrors.firstname = 'First name is required and should only contain letters.';
        }
        if (!lastname.match(/^[a-zA-Z\s]+$/)) {
            newErrors.lastname = 'Last name is required should only contain letters.';
        }
        if (!username.match(/^\w+$/)) {
            newErrors.username = 'Username is required and should only contain letters, numbers, and underscores.';
        }

        if (
            phoneNumber &&
            (!/^[\d+\-()\s]+$/.test(phoneNumber) || 
            phoneNumber.replace(/\D/g, '').length !== 10) 
        ) {
            newErrors.phoneNumber = 'Invalid phone number.';
        }

        if (phoneNumber) {
            const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        
            // Check if the cleaned phone number has exactly 10 digits
            if (cleanedPhoneNumber.length === 10) {
                // Format the phone number to (123) 456-7890
                formData.phoneNumber = formatPhoneNumber(phoneNumber);
            } else {
                newErrors.phoneNumber = 'Invalid phone number. Must contain exactly 10 digits.';
            }
        }

        if (profession && !profession.match(/^[a-zA-Z0-9\s]+$/)) {
            newErrors.profession = 'Profession should only contain letters, numbers, and spaces.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatPhoneNumber = (number) => {
        // Extract only digits from the phone number
        const cleaned = number.replace(/\D/g, '');
    
        // Format as (123) 456-7890 if it's 10 digits
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        }
    
        // Return the original number if it can't be formatted
        return number;
    };

    const handleSignUp = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        };

        try {
            const { email, password } = formData;

            console.log('Data being sent to the server:', formData);
            const response = await fetch('/api/users/register', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await sendEmailVerification(user);
                setEmailMessage('Verification email sent! Please check your inbox.');
                navigate('/VerifyEmail');
            } else {
                const errorText = await response.text();
                setErrors({ general: `User registration failed: ${errorText}` });
            }
        } catch (error) {
            setErrors({ general: error.message });
            console.error(error);
        }
    };

    return (
        <div className='bg-main-background relative'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20 bg-main-background">
                <strong className='text-3xl'>Welcome!</strong>
                <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto" />

                <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-left px-4'>
                    <p className='font-bold'>Sign up to get started</p>
                </div>

                <form className="flex flex-col gap-4 px-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3" onSubmit={handleSignUp}>
                    {!errors.email ? (
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    ) : (
                        <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className='p-2 border border-red-500 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    )}

                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                    {!errors.password ? (
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    ) : (
                        <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                            className='p-2 border border-red-500 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    )}
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

                    {!errors.firstname ? (
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={formData.firstname}
                            onChange={handleChange}
                            className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    ) : (
                        <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                            className='p-2 border border-red-500 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    )}
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}

                    {!errors.lastname ? (
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={formData.lastname}
                            onChange={handleChange}
                            className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    ) : (
                        <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                            className='p-2 border border-red-500 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    )}
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}

                    {!errors.username ? (
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    ) : (
                        <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                            className='p-2 border border-red-500 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                    )}
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

                    
                    <p className='text-gray-600 italic'>Optional</p>

                    <input
                        type="text"
                        placeholder="Profession"
                        name="profession"
                        value={formData.profession}
                        onChange={handleChange}
                        className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                    />
                    {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}


                    <AddressAutocomplete onAddressSelect={handleAddressSelect} countryCodes={['ca']}/>

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                    />

                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

                    <LongButton
                        buttonName='Sign up'
                        type='submit'
                        className='py-2 w-full bg-green-600 text-white font-bold'
                    />
                    {errors.general && <p className="text-red-500">{errors.general}</p>}
                    {emailMessage && <p className="text-green-500">{emailMessage}</p>}
                </form>

                <p>By signing up, you agree to the <strong>Terms, Conditions</strong> and <strong>Privacy Policy</strong>.</p>
                <LongButton buttonName='Already a member?' pagePath="/SignIn" className='w-full bg-green-200' />
            </div>
        </div>
    );
}
