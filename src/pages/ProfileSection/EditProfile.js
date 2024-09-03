import React from "react";
import InAppLogo from "../components/inAppLogo";
import NavBar from "../components/navbar";
import Sprout from "../assets/sprout.png";
import { FaUserCircle } from "react-icons/fa";
import LongButton from "../components/longButton";
import BackButton from "../components/backButton";
import InputWithClearButton from "../components/inputWithClearButton";
export default function EditProfile() {
    return (
        <div className="bg-main-background relative">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20">
                <FaUserCircle className="text-green-500 text-9xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-2" />
                <div className="px-4 block w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
                    <form className="flex flex-col flex-grow w-full gap-4 mb-8">
                        <InputWithClearButton
                            type="email"
                            placeholder="Email"
                            id="email"
                        />
                        <InputWithClearButton
                            type="password"
                            placeholder="Password"
                            id="password"
                        />
                        <InputWithClearButton
                            type="password"
                            placeholder="Re-enter Password"
                            id="reenterPassword"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="Profession"
                            id="profession"
                        />
                        <InputWithClearButton
                            type="tel"
                            placeholder="Phone Number"
                            id="phoneNumber"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="Address"
                            id="address"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="City"
                            id="city"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="Province"
                            id="province"
                        />
                        <InputWithClearButton
                            type="text"
                            placeholder="Postal Code"
                            id="postalCode"
                        />
                        <LongButton
                            buttonName="Save Changes"
                            className="w-full rounded shadow-lg bg-green-500 text-black font-semibold"
                            pagePath="/Profile"
                        />
                    </form>
                </div>
            </div>
            <NavBar ProfileColor="#00B761" SproutPath={Sprout} />
        </div>
    );
}
