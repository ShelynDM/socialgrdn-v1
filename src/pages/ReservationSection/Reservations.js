import React from "react";
import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import SearchBar from "../../components/SearchComponents/search";

import Reservation from "./Reservation";
import list from "./ReservationList.json";

// This is the Listing page of the application where users can view other users' listings

export default function Reservations({ name, landowner, start, end, address, image }) {
    const navigate = useNavigate();

    const handleViewReservation = (id) => {
        navigate('/ReservationDetails');
    };


    return (
        <div className='bg-main-background relative'>

            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-4 pb-20 bg-main-background">
                <div className='p-2 fixed top-0 left-0 w-full bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div>
                <div className="pb-2 mt-24">
                    <h2 className="text-xl">Upcoming Reservations</h2>
                </div>
                <div>
                    <ul>
                        {list.map((reservation) => (
                            <li key={reservation.id} onClick={() => handleViewReservation(reservation.id)} >
                                <Reservation name={reservation.name} landowner={reservation.landowner}
                                    start={reservation.start} end={reservation.end}
                                    address={reservation.address} image={reservation.image}
                                />
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <NavBar SproutPath={GreenSprout} />
        </div >

    );
}
