import React from "react";
import { FaUser, FaUserCircle, FaPhone, FaLock, FaRegEnvelope, FaUsers } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import BackButton from "../../components/Buttons/backButton";
import { FaLocationDot } from "react-icons/fa6";
import LongButton from "../../components/Buttons/longButton";
import { TbReportAnalytics } from "react-icons/tb";
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import Sprout from "../../assets/navbarAssets/sprout.png";

export default function ModeratorViewProfile() {
    return (
        <div className="bg-main-background min-h-screen flex flex-col justify-between">
            <InAppLogo />
            <BackButton />
            <div className="flex flex-col items-center justify-center flex-grow mt-6">
                <FaUserCircle className="text-green-500 text-9xl mb-4" />
                <div className="w-full px-4 sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mb-24">
                    {/* Align content to center and text to right */}
                    <div className="flex justify-center w-full">
                        <div className="flex flex-col items-center justify-center w-full ">
                            <div>
                                <div className="flex items-center justify-center space-x-4 p-2 mb-2 w-full">
                                    <h1 className="text-xl font-semibold ">I am Admin</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaUser className="text-2xl" />
                                    <h1 className="text-lg">Jarod Traxel</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaLocationDot className="text-2xl" />
                                    <h1 className="text-lg">422 - 13th St SW T2R 1G8 </h1>
                                    
                                </div>
                                
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaPhone className="text-1" />
                                    <h1 className="text-lg">587-966-8546</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaLock className="text-1" />
                                    <h1 className="text-lg">*******</h1>
                                </div>
                                <div className="flex items-center space-x-4 p-3 w-full">
                                    <FaRegEnvelope className="text-1" />
                                    <h1 className="text-lg">socialgrdnadmin@sait.ca</h1>
                                </div>
                            </div>
                       

                            {/* Edit Button */}
                            <div className="w-full p-3">
                                <LongButton
                                    buttonName="Edit"
                                    className="w-full rounded shadow-lg bg-green-500 text-black font-semibold"
                                    pagePath="/Profile"
                                />
                            </div>
                        <div className="flex flex-col items-center justify-center w-full mr-12">
                            <div>
                            <div className="flex items-center space-x-4 p-3 w-full">
                                <FaUsers className="text-2xl" />
                                <button className="text-xl font-semibold">View all users</button>
                                <SlArrowRight className="text-lg " />
                            </div>
                            <div className="flex items-center space-x-4 p-3 w-full">
                                <TbReportAnalytics className="text-2xl" />
                                <button className="text-xl font-semibold">View reports</button>
                                <SlArrowRight className=" text-lg ml-4 " />
                            </div>
                            
                            </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <NavBar ProfileColor={"#00B761"} SproutPath={Sprout} />
        </div>
    );
}
