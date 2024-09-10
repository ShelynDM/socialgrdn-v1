import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../_utils/firebase';
import logo from '../../assets/logo/SocialGrdnLogo.png';
import LongButton from '../../components/Buttons/longButton';

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
        userPostalCode: ''
    });
    const [error, setError] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
        const { email, password, firstname, lastname, username } = formData;
        
        if (email && password && email.includes('@') && email.includes('.') && password.length >= 6 && firstname && lastname && username) {
            try {
                const response = await fetch('http://localhost:3000/api/users/register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
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
                    setError(`User registration failed: ${errorText}`);
                }
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
        } else {
            if (!email || !password || !firstname || !lastname || !username) {
                setError('Please fill in all required fields: email, password, first name, last name, and username.');
            } else if (!email.includes('@') || !email.includes('.')) {
                setError('Please enter a valid email.');
            } else if (password.length < 6) {
                setError('Password must be at least 6 characters.');
            }
        }
    };

    return (
        <div className='bg-main-background relative'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
                <div>
                    <strong className='text-3xl'>Welcome!</strong>
                </div>
                <div>
                    <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto" />
                </div>
                <div className='w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-left px-4'>
                    <p className='font-bold'>Sign up to get started</p>
                </div>
                <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                    <form className="flex flex-col flex-grow w-full gap-4" onSubmit={handleSignUp}>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                            required
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                            required
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                            required
                        />
                        <p className='text-gray-600 italic'>Optional</p>
                        <input
                            type="text"
                            placeholder="Profession"
                            name="profession"
                            value={formData.profession}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <input
                            type="text"
                            placeholder="Address Line 1"
                            name="userAddress"
                            value={formData.userAddress}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <input
                            type="text"
                            placeholder="City"
                            name="userCity"
                            value={formData.userCity}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <input
                            type="text"
                            placeholder="Province"
                            name="userProvince"
                            value={formData.userProvince}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            name="userPostalCode"
                            value={formData.userPostalCode}
                            onChange={handleChange}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
                        />
                        <LongButton 
                            buttonName='Sign up'
                            type='submit'
                            className='py-2 w-full rounded shadow-lg bg-green-600 text-white font-bold'
                        />
                        {emailMessage && <p className="text-green-500 mt-2">{emailMessage}</p>}
                    </form>
                    <div className='w-full'>
                        {error && <p className="text-red-500 mt-2 text-left">{error}</p>}
                    </div>
                </div>
                <div className='px-6 text-sm'>
                    <p>By signing up, you agree to the <strong>Terms, Conditions</strong> and <strong>Privacy Policy</strong>.</p>
                </div>
                <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
                    <LongButton 
                        buttonName='Already a member?'
                        className=' w-full bg-green-200 font-bold'
                        pagePath="/SignIn"
                    />
                </div>
            </div>
        </div>
    );
}