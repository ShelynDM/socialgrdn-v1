import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import BackButton from "../../components/Buttons/backButton";


export default function ReservationDetails() {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const navigate = useNavigate();

    const image = "https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg";
    const name = "Gibson's Greenhouse";
    const start = "2021-06-01";
    const end = "2021-09-30";
    const address = "Next St. Calumet, MI 49913";
    const duration = 7;

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
    };

    const handleConfirmCancellation = () => {
        navigate('/ReservationCancelled');
    };


    return (
        <div className='bg-main-background relative'>
            <InAppLogo />

            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20 pt-10">
                <BackButton />

                <section className="mb-3 mt-5">
                    <img src={image} alt="Listing" className="w-full h-auto" />
                    <div className="p-3">
                        <h2 className="font-bol text-xl">{name}</h2>
                        <p>{address}</p>
                    </div>
                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Reservation details</h2>
                        <div className="p-3 flex">
                            <div className="w-1/3">
                                <p>Date</p>
                                <p>Duration</p>
                            </div>
                            <div className="w-2/3">
                                <p>{start} - {end}</p>
                                <p>{duration} months</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Payment details</h2>
                        <div className="p-3 flex text-sm border-b-2 border-slate-600">
                            <div className="w-2/3">
                                <p>{name} x {duration} month/s</p>
                                <p>SocialGrdn fee (3%)</p>
                                <p>Taxes</p>
                            </div>
                            <div className="w-1/3">
                                <p>CAD </p>
                                <p>CAD </p>
                                <p>CAD </p>
                            </div>
                        </div>
                        <div className="p-3 flex text-sm">
                            <div className="w-2/3">
                                <p>Total</p>
                            </div>
                            <div className="w-1/3">
                                <p>CAD </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Property Details</h2>
                        <div className="p-3 flex text-sm border-b-2 border-slate-600">
                            <div className="w-2/3">
                                <p>Dimensions</p>
                                <p>Soil type</p>
                                <p>Amenities</p>
                                <p>Restrictions</p>
                                <p>Possible Crops</p>
                            </div>
                            <div className="w-1/3">
                                <p> </p>
                                <p> </p>
                                <p> </p>
                                <p> </p>
                                <p> </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Cancellation Policy</h2>
                        <p className="p-3">No refund / Cancel without charge within 20 days</p>
                    </div>
                    <div className="self-center p-5">
                        <p className="text-red-600 text-base font-bold text-center cursor-pointer" onClick={handleCancelClick}>Cancel Reservation</p>
                    </div>
                </section>

                {/* Cancel Confirmation Modal */}
                {showCancelModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded-md shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Confirm Cancellation</h2>
                            <p>Are you sure you want to cancel the reservation?</p>
                            <p>Cancellation cannot be reversed.</p>
                            <div className="mt-4 flex justify-center">
                                <button className="bg-gray-300 px-4 py-2 mr-2 rounded" onClick={handleCloseCancelModal}>Not Now</button>
                                <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={handleConfirmCancellation}>Yes, Cancel</button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}