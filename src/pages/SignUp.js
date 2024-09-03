import React, { useState } from 'react';
import logo from '../../assets/logo/SocialGrdnLogo.png';
import LongButton from '../../components/Buttons/longButton';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../_utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [profession, setProfession] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userAddress, setUserAddress] = useState('');
    const [userCity, setUserCity] = useState('');
    const [userProvince, setUserProvince] = useState('');
    const [userPostalCode, setUserPostalCode] = useState('');
    const [error, setError] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    
    // This is a hook from react-router-dom that allows you to navigate to different pages
    const navigate = useNavigate();

    // This function is called when the user clicks the "Sign up" button
    const handleSignUp = async (event) => {
        event.preventDefault();
        if (email && password && email.includes('@') && email.includes('.') && password.length >= 6 && firstname && lastname && username) {
            try {
                const userData = {
                    email,
                    firstname,
                    lastname,
                    username,
                    profession,
                    phoneNumber,
                    userAddress,
                    userCity,
                    userProvince,
                    userPostalCode,
                };
    
                const response = await fetch('/api/users/register', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
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
            // This else statement handles the case where the user has not entered any required fields
            if (!email && !password) {
                setError('Please enter an email and password.');
            } else if (!email) {
                setError('Please enter an email.');
            } else if (!password) {
                setError('Please enter a password.');
            } else if (!email.includes('@') || !email.includes('.')) {
                setError('Please enter a valid email.');
            } else if (password.length < 6) {
                setError('Password must be at least 6 characters.');
            } else if (!firstname) {
                setError('Please enter your first name.');
            } else if (!lastname) {
                setError('Please enter your last name.');
            } else if (!username) {
                setError('Please enter a username.');
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
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="First Name"
                            id="firstname"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Last Name"
                            id="lastname"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Profession (optional)"
                            id="profession"
                            value={profession}
                            onChange={(e) => setProfession(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Phone Number (optional)"
                            id="phonenumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Address Line 1 (optional)"
                            id="userAddress"
                            value={userAddress}
                            onChange={(e) => setUserAddress(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="City "
                            id="userCity"
                            value={userCity}
                            onChange={(e) => setUserCity(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Province"
                            id="userProvince"
                            value={userProvince}
                            onChange={(e) => setUserProvince(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            id="userPostalCode"
                            value={userPostalCode}
                            onChange={(e) => setUserPostalCode(e.target.value)}
                            className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
                        <LongButton buttonName='Sign up'
                            type='submit'
                            className='py-2 w-full rounded shadow-lg bg-green-600 text-white font-bold' />
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
                    <LongButton buttonName='Already a member?'
                        className=' w-full bg-green-200 font-bold'
                        pagePath="/SignIn" />
                </div>
            </div>
        </div>
    );
}