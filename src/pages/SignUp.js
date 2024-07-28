import React, { useState } from 'react';
import logo from '../assets/SocialGrdnLogo.png';
import LongButton from '../components/longButton';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../_utils/firebase';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
      event.preventDefault();
      if (email && password) {
          try {
              const userCredential = await createUserWithEmailAndPassword(auth, email, password);
              const user = userCredential.user;
              await sendEmailVerification(user);
              setEmailMessage('Verification email sent! Please check your inbox.');
              navigate('/VerifyEmail');
          } catch (error) {
              setError(error.message);
              console.log(error);
          }
      }
      else {
        if (!email && !password) {
          setError('Please enter an email and password.');
        }
        else if (!email) {
          setError('Please enter an email.');
        }
        else if (!password) {
          setError('Please enter a password.');
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
                        <LongButton buttonName='Sign up'
                            onClick={handleSignUp}
                            type='submit'
                            className='py-2 w-full rounded shadow-lg bg-green-600 text-white font-bold' />
                            {emailMessage && <p className="text-green-500 mt-2">{emailMessage}</p>}
                    </form>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
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
