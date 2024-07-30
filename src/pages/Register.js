import React, { useState } from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import { FaUserCircle } from 'react-icons/fa';
import LongButton from '../components/longButton';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_utils/firebase';
import { updateProfile } from 'firebase/auth';

export default function Register() {
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

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (firstname && lastname && username && profession && phoneNumber && userAddress && userCity && userProvince && userPostalCode) {
      try {
        const user = auth.currentUser;
        await updateProfile(user, {
          displayName: firstname + ' ' + lastname,
        });

        const userData = {
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

        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          credentials:'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          navigate('/Search');
        } else {
          setError('Failed to register user');
        }
      } catch (error) {
        setError(error.message);
        console.log(error);
      }
    } else {
      setError('All fields are required');
    }
  }

  return (
    <div className='bg-main-background relative'>
      <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
        <img src={logo} alt="Social Grdn Logo" className="m-2 block w-1/4 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/12" />
        <div>
          <strong className=' text-3xl'>Welcome!</strong>
        </div>
        <div>
          <FaUserCircle className='text-7xl' style={{ color: '#00B761' }} />
        </div>
        <div className='p-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <form className="flex flex-col flex-grow w-full gap-4" onSubmit={handleRegister}>
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
              placeholder="Profession"
              id="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Phone Number"
              id="phonenumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Address Line 1"
              id="userAddress"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="City"
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
            <LongButton buttonName='Register'
              onClick={handleRegister}
              className='p-2 w-full  rounded shadow-lg bg-green-600 text-white font-bold' />
          </form>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}