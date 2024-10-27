/**
 * ReservationList.js
 * Description: Page for displaying a list of rentals for the user
 * Author: Tiana Bautista
 * Date: 2024-10-23
 */

// Importing necessary libraries
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import SearchBar from "../../components/SearchComponents/search";
import { useUser } from "../../UserContext";
import Reservation from "../../components/rentalComponent/rental";

export default function RentalList() {
    const navigate = useNavigate();
    const { userId } = useUser();

    //This function passes the rental id to the RentalDetails page
    const handleViewRental = (id) => {
        navigate(`/RentalDetails/${id}`);
    };

    // State to hold all rentals
    const [rental, setRentals] = useState([]);


    useEffect(() => {
        // Fetching rentals from API
        const fetchRentals = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getRentalList?userID=${userId}`);
                if (!response.ok) {
                    console.log("Network response was not ok");
                    return;
                }
                //stores the response in rentalData in json format
                const rentalData = await response.json();

                //stores rentals in the rental list
                setRentals(rentalData);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchRentals();
    }, [userId]);

    return (
        <div className='bg-main-background relative'>
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-2 pb-20 bg-main-background">
                <div className='p-2 fixed top-0  w-full bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='mx-2 px-2 fixed top-12 flex w-full items-center justify-between bg-main-background'>
                    <div className="flex-grow w-full">
                        <SearchBar className="w-full" />
                    </div>
                </div>
                {/* Updates the page title based on the number of rentals */}
                <div className="pb-2 mt-24">
                    {rental.length === 0 ? (
                        <h2 className="text-xl">No upcoming reservations</h2>
                    ) : (
                        <h2 className="text-xl">Upcoming Reservations</h2>
                    )}

                </div>
                {/* Displays the rentals */}
                <div >
                    <ul>
                        {rental.map((rental) => (
                            <li key={rental.rental_id} onClick={() => handleViewRental(rental.rental_id)}>
                                <Reservation
                                    name={rental.property_name}
                                    landowner={rental.property_owner}
                                    start={rental.start_date}
                                    end={rental.end_date}
                                    address={rental.address_line1 + ', ' + rental.city + ', ' + rental.province}
                                    growthZone={rental.growth_zone}
                                    image={rental.image_url}
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