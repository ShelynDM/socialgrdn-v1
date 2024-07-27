import React from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import LongButton from '../components/longButton';
import { Link } from 'react-router-dom';

export default function SignIn() {
    return (
        <div className='bg-main-background'>
          <div className="flex flex-col items-center justify-center min-h-screen m-2 pb-20">
            <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto m-4" />
            <div className='m-4'>
              <h1 className='text-4xl font-bold'>Welcome back!</h1>
            </div>
            <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
              <form className="flex flex-col flex-grow w-full gap-4">
                <input type="email" placeholder="Email" id="email" name="email" className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
                <input type="text" placeholder="Password" id="password" name="password"className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'/>
              </form>
              <Link to="/ForgotPassword" className='flex justify-end font-bold my-2 mb-4' style={{ color: '#00811C' }}>
    Forgot your password?
</Link>
            </div>
            <LongButton buttonName='Sign in' 
                onClick={() => alert('Sign in Clicked')} 
                className='p-2 w-full rounded shadow-xl bg-green-600 text-white font-bold' />
            <div className='my-4'>
              <p>Don't have an account?</p>
            </div>
            <LongButton buttonName='Register now' 
                className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
                pagePath="/Register"/>
          </div>
        </div>
    );
}