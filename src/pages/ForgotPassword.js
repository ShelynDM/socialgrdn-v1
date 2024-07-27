import React from "react";
import BackButton from "../components/backButton";
import LongButton from "../components/longButton";

export default function ForgotPassword() {
  return (

    <div className="flex flex-col pt-11 h-screen bg-main-background relative">
      <BackButton/>
      <div className=" p-8 mt-32">
        <h1 className="text-3xl font-semibold mb-6 text-center">Forgot Password?</h1>
        <p className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-gray-600 mb-6 px-2 text-center">Enter your account's email to receive instructions to reset your password</p>
          <div className="mb-4 px-4 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
            <input type="text" placeholder="Email" className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500"/>
          </div>
          <div className='flex flex-col items-center justify-center gap-4 pb-6 w-full'>
              <LongButton buttonName='Send Email' 
                onClick={() => alert('Send Email')} 
                className='p-2 w-full  rounded shadow-lg bg-green-500 text-white font-bold' />
          </div>
      </div>
    </div>
  );
}

