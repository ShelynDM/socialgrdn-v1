import React, { useEffect, useState } from "react"; // Importing useEffect and useState from React
import { useNavigate } from "react-router-dom"; // Only useNavigate from react-router-dom

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import SearchBar from "../../components/SearchComponents/search";
import { useUser } from "../../UserContext";
import Reservation from "./Reservation";


// This is the Listing page of the application where users can view other users' listings


export default function ReservationList() {
    const navigate = useNavigate();
    const { userId } = useUser();

    const handleViewReservation = (id) => {
        navigate('/ReservationDetails');
    };

    // State to hold all reservations
    const [reservations, setReservations] = useState([]);

    // Fetching reservations from API
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getReservationList?userID=${userId}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                    return;
                }
                const rentalData = await response.json();
                //stores reservations in the Reservations list
                setReservations(rentalData);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, [userId]);

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
                {/* Updates the page title based on the number of reservations */}
                <div className="pb-2 mt-24">
                    {reservations.length === 0 ? (
                        <h2 className="text-xl">No upcoming reservations</h2>
                    ) : (
                        <h2 className="text-xl">Upcoming Reservations</h2>
                    )}

                </div>
                {/* Displays the reservations */}
                <div>
                    <ul>
                        {reservations.map((reservation) => (
                            <li key={reservation.rental_id} onClick={() => handleViewReservation(reservation.rental_id)}>
                                <Reservation
                                    name={reservation.property_name}
                                    landowner={reservation.property_owner}
                                    start={reservation.start_date}
                                    end={reservation.end_date}
                                    address={reservation.address_line1 + ', ' + reservation.city + ', ' + reservation.province}
                                    growthZone={reservation.growth_zone}
                                    image={reservation.image_url}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <NavBar SproutPath={GreenSprout} />
        </div>
    );
}