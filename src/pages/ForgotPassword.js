import React, { useState } from "react";
import LongButton from "../components/longButton";
import BackButton from "../components/backButton";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../_utils/firebase";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  // Initialize useNavigate hook for programmatic navigation
  const navigate = useNavigate();
  // State to hold message to display to the user
  const [message, setMessage] = useState("");
  // State to determine the type of message (success or error)
  const [messageType, setMessageType] = useState(""); // success or error

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const emailVal = e.target.email.value; // Get email value from form input
    // Send password reset email using Firebase authentication
    sendPasswordResetEmail(auth, emailVal)
      .then((data) => {
        // On successful email send
        setMessageType("success");
        setMessage("Check your email for a password reset link");
        // Navigate to SignIn page after 3 seconds
        setTimeout(() => navigate('/SignIn'), 3000);
      })
      .catch((error) => {
        // On failure to send email
        setMessageType("error");
        setMessage("Invalid email. Please try again.");
      });
  };

  return (
    <div className="flex flex-col pt-11 h-screen bg-main-background relative">
      {/* BackButton component for navigation */}
      <BackButton />
      <div className="flex flex-col items-center justify-center gap-4 pb-6 w-full mt-40">
        <h1 className="text-3xl font-semibold mb-6 text-center">Forgot Password?</h1>
        <p className="mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 text-gray-600 mb-6 px-2 text-center">
          Enter your account's email to receive instructions to reset your password
        </p>
        <form
          className="mb-4 px-4 mx-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            name="email"
            type="text"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-green-500 mb-3"
          />
          <LongButton
            buttonName="Send Email"
            type="submit"
            className="w-full rounded shadow-lg bg-green-600 text-white font-bold"
          />
        </form>
        {/* Display message to the user based on messageType */}
        {message && (
          <div className={`mt-3 text-center ${messageType === "success" ? "text-green-600 font-bold " : "text-red-600 font-bold"}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
