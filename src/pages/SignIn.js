import React, { useState } from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import LongButton from '../components/longButton';
import { useNavigate } from 'react-router-dom';
import { auth } from '../_utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.emailVerified) {
          if (!user.displayName) {
            navigate('/Register');
          } else {
            navigate('/Search');
          }
        } else {
          navigate('/VerifyEmail');
        }
      } catch (error) {
        setError("Invalid Credentials. Please try again or Sign Up.");
        console.log(error);
      }
    }
    else {
      setError("Please enter a valid email and password.");
    }
  };

  const handleReset =  () => {
    navigate('/ForgotPassword');

  }

  return (
    <div className='bg-main-background'>
      <div className="flex flex-col items-center justify-center min-h-screen m-2 pb-20">
        <img src={logo} alt="Social Grdn Logo" className="w-auto h-auto m-4" />
        <div className='m-4'>
          <h1 className='text-4xl font-bold'>Welcome back!</h1>
        </div>
        <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <form className="flex flex-col flex-grow w-full gap-4" onSubmit={handleSignIn}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-2 border border-gray-400 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500'
            />
            <LongButton 
              buttonName='Sign In' 
              type='submit'
              className='p-2 w-full rounded shadow-lg bg-green-600 font-bold text-white'
              />
            {error && <p className="text-red-500">{error}</p>}
            
          </form>
          <div className='flex justify-end '>
          <button className=" text-red-500 text-base font-bold"onClick= {handleReset} >Forgot Password?</button>
          </div>
        </div>
        <div className='my-3'>
          <p>Don't have an account?</p>
        </div>
        <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <LongButton buttonName='Sign up' 
            className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
            pagePath="/SignUp"/>
        </div>
      </div>
    </div>
  );
}
