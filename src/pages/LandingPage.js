import React from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import LongButton from '../components/longButton';

// This is the landing page of the application where users can sign up or log in
export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-32 bg-radial-green"> 
      <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto" />
      <div className="flex flex-col items-center justify-center gap-4 pb-6 w-full">
        <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <LongButton buttonName='Sign up' 
              className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold'
              pagePath="/SignUp"/>
        </div>
        <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <LongButton buttonName='Log in' 
            className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
            pagePath="/SignIn"/>
        </div>
      </div>
      
    </div>
  );
}