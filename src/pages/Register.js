import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import LongButton from '../components/longButton';
import InAppLogo from '../components/inAppLogo';


export default function Register() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = React.useState('');
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [username, setUserName] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [userAddress, setUserAddress] = React.useState('');
  const [userCity, setUserCity] = React.useState('');
  const [userProvince, setUserProvince] = React.useState('');
  const [userPostalCode, setUserPostalCode] = React.useState('');


  function handleSignInButton() {
    window.location.href = '/SignIn';
  }
  function handleSignUp(event) {
    event.preventDefault();
    if (password !== repassword) {
      alert('Passwords do not match!');
      return;
    }
    else {

      const user = {
        email: email,
        name: password,
        firstname: firstname,
        lastname: lastname,
        username: username,
        profession: profession,
        phonenumber: phonenumber,
        userAddress: userAddress,
        userCity: userCity,
        userProvince: userProvince,
        userPostalCode: userPostalCode
      };
    }
  }

  return (
    <div className='bg-main-background relative'>
      <InAppLogo />
      <div className="flex flex-col items-center justify-center gap-2 min-h-screen m-2 pb-20">
        <div>
          <strong className=' text-3xl'>Welcome!</strong>
        </div>
        <div>
          <FaUserCircle className='text-7xl' style={{ color: '#00B761' }} />
        </div>
        <div className='px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3'>
          <form className="flex flex-col flex-grow w-full gap-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Re-Enter Password"
              id="email"
              name="email"
              onChange={(e) => setRePassword(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="First Name"
              id="firstname"
              name="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Last Name"
              id="lastname"
              name="lastname"
              onChange={(e) => setLastName(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Profession"
              id="profession"
              name="profession"
              onChange={(e) => setProfession(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Phone Number"
              id="phonenumber"
              name="phonenumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Address Line 1"
              id="userAddress"
              name="userAddress"
              onChange={(e) => setUserAddress(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="City"
              id="userCity"
              name="userCity"
              onChange={(e) => setUserCity(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Province"
              id="userProvince"
              name="userProvince"
              onChange={(e) => setUserProvince(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
            <input
              type="text"
              placeholder="Postal Code"
              id="userPostalCode"
              name="userPostalCode"
              onChange={(e) => setUserPostalCode(e.target.value)}
              className='p-2 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-green-500 focus:border-green-500' />
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
            onClick={handleSignInButton}
            className='p-2 w-full rounded shadow-lg bg-green-200 font-bold'
            pagePath="/SignIn" />
        </div>
      </div>
    </div>
  );
}