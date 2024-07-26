import React from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import { FaUserCircle } from 'react-icons/fa';
import LongButton from '../components/longButton';


export default function Register() {
  return (
    <div className='bg-main-background relative'>
      <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
          <img src={logo} alt="Social Grdn Logo" className="m-2 block w-1/4 sm:w-1/6 md:w-1/6 lg:w-1/6 xl:w-1/12" />
          <div>
              <strong className=' text-3xl'>Welcome!</strong>
          </div>
          <div>
              <FaUserCircle className='text-7xl' style={{ color: '#00B761' }}/>
          </div>
          <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
            <form className="flex flex-col flex-grow w-full gap-4">
              <input 
                type="email" 
                placeholder="Email" 
                id="email" 
                name="email" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="password" 
                placeholder="Password" 
                id="password" 
                name="password"
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Re-Enter Password" 
                id="email" 
                name="email" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="First Name" 
                id="firstname" 
                name="firstname" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Last Name" 
                id="lastname" 
                name="lastname" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Username" 
                id="username" 
                name="username" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Profession" 
                id="profession" 
                name="profession" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Phone Number" 
                id="phonenumber" 
                name="phonenumber" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Address Line 1" 
                id="userAddress" 
                name="userAddress" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="City" 
                id="userCity" 
                name="userCity" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Province" 
                id="userProvince" 
                name="userProvince" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              <input 
                type="text" 
                placeholder="Postal Code" 
                id="userPostalCode" 
                name="userPostalCode" 
                className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
            </form>
          </div>
          <div className='px-6 text-sm'>
            <p>By signing up, you agree to the <strong>Terms, Conditions</strong> and <strong>Privacy Policy</strong>.</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
              <LongButton buttonName='Sign up' 
                onClick={() => alert('Sign Up Clicked')} 
                className='p-2 w-full  rounded shadow-lg bg-green-600 text-white font-bold' />
              <LongButton buttonName='Already a member?' 
                className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
                pagePath="/SignIn"/>
          </div>
      </div>
    </div>
  );
}