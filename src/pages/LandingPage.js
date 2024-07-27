import React from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import LongButton from '../components/longButton';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-32 bg-radial-green"> 
      <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto" />
      <div className="flex flex-col items-center justify-center gap-4 pb-6 w-full">
          <LongButton buttonName='Sign up' 
              className='p-2 w-full rounded shadow-lg bg-green-600 text-white font-bold'
              pagePath="/Register"/>
          <LongButton buttonName='Log in' 
            className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
            pagePath="/SignIn"/>
      </div>
    </div>
  );
}