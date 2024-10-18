import React, { useEffect, useState } from "react"; // Importing useEffect and useState from React
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import BackButton from "../../components/Buttons/backButton";
import { FaLocationDot } from "react-icons/fa6";
import zoneColor from "../../components/ZoneColor/zoneColor";
import { differenceInMonths, differenceInDays, parseISO } from 'date-fns';


export default function ReservationDetails() {
    const [showCancelModal, setShowCancelModal] = useState(false);
    const navigate = useNavigate();
    const rentalID = useParams().id;            //parameter
    const [reservation, setReservation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [durationMonths, setDurationMonths] = useState(null);   // need to finalize issues with duration rules and pricing
    const [durationDays, setDurationDays] = useState(null);       //need to finalize issues with duration rules and pricing
    console.log(reservation);


    // Fetching reservations from API
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                console.log("rentalID :" + rentalID);
                const response = await fetch(`http://localhost:3000/api/getReservationDetails?rentalID=${rentalID}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                    return;
                }
                const reservationData = await response.json();
                //Convert timestamps to 'Month Day, Year' format
                const formattedStartDate = new Date(reservationData.start_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                });
                const formattedEndDate = new Date(reservationData.end_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                setStartDate(formattedStartDate);
                setEndDate(formattedEndDate);

                //stores reservations in the Reservations list
                setReservation(reservationData);
                //computeDuration();
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservation();
    }, [rentalID]);

    const computeDuration = () => {
        if (reservation.start_date && reservation.end_date) {
            const start = parseISO(reservation.start_date);
            const end = parseISO(reservation.end_date);

            console.log(start);
            console.log(end);
            // Calculate the number of complete months between the dates
            const months = differenceInMonths(end, start);

            // Calculate the number of days remaining after accounting for complete months
            const days = differenceInDays(end, new Date(start.getFullYear(), start.getMonth() + months, start.getDate()));

            setDurationMonths(months);
            setDurationDays(days);
        }
    };

    const handleCancelClick = () => {
        setShowCancelModal(true);
    };

    const handleCloseCancelModal = () => {
        setShowCancelModal(false);
    };

    const handleConfirmCancellation = () => {
        navigate('/ReservationCancelled');
    };
    useEffect(() => {
        computeDuration();
        //eslint-disable-next-line
    }, [reservation]);


    return (
        <div className='bg-main-background relative'>
            <InAppLogo />

            <div className="flex flex-col items-center justify-center gap-2 min-h-screen pb-20 pt-10">
                <BackButton />

                <section className="mb-3 mt-5">
                    <img src={reservation.image_url} alt="Listing" className="w-full h-auto" />

                    <div className="p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FaLocationDot className="text-1" />
                                <h2 className="text-xl font-bold ml-2">{reservation.property_name}</h2>
                            </div>
                            {/* Farming Zone */}
                            <div className="flex items-center flex-row gap-1">
                                <div className="w-4 h-4 border border-gray-400" style={{ backgroundColor: zoneColor(reservation.growth_zone) }}></div>
                                <p>Zone {reservation.growth_zone}</p>
                            </div>
                        </div>
                        <div>
                            <p className="px-6">{reservation.address_line1 + ', ' + reservation.city + ', ' + reservation.province}</p>
                        </div>
                    </div>

                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Reservation details</h2>
                        <div className="p-3 flex">
                            <div className="w-1/3">
                                <p>Date</p>
                                <p>Duration</p>
                            </div>
                            <div className="w-2/3">

                                <p>{startDate} - {endDate}</p>
                                <p className="text-sm">{durationMonths} Months {durationDays} Days</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-3 text-sm">
                        <h2 className="font-bold">Payment details</h2>
                        <div className="p-3 flex text-sm border-b-2 border-slate-600">
                            <div className="w-2/3">
                                <p>{reservation.property_name} x {durationMonths} month/s</p>
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
                {
                    showCancelModal && (
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
                    )
                }


            </div >
            <NavBar SproutPath={GreenSprout} />
        </div >
    );
}