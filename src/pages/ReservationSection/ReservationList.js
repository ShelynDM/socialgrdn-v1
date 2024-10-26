import React, { useEffect, useState } from "react"; // Importing useEffect and useState from React
import { useNavigate } from "react-router-dom"; // Only useNavigate from react-router-dom
import InAppLogo from "../../components/Logo/inAppLogo";
import NavBar from "../../components/Navbar/navbar";
import GreenSprout from "../../assets/navbarAssets/sproutGreen.png";
import SearchBar from "../../components/SearchComponents/search";
import { useUser } from "../../UserContext";
import Reservation from "../../components/reservationcomponent/reservation";

// Component to reuse search components
import usePropertyResult from "../../components/SearchComponents/propertyResult";


// This is the Listing page of the application where users can view other users' listings
export default function ReservationList() {
    const navigate = useNavigate();
    const { userId } = useUser();

    // Hooks that are used to get the search functionality
    const propertyResult = usePropertyResult();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    // ------------------- Imported Function to handle search query ------------------- //

    // Main search query handler with fallback to default results logic
    const handleSearchQueryChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    
        if (query.trim() === "") {
            setSuggestions([]);
            navigate("/Search");
        } else {
            // Collect individual words from relevant fields of all properties
            const wordSet = new Set(); // Use Set to avoid duplicates
    
            propertyResult.forEach((result) => {
                Object.values(result).forEach((value) => {
                    if (typeof value === "string") {
                        // Split strings into individual words and store them in the Set
                        value.split(/\s+/).forEach((word) => {
                            if (word.toLowerCase().startsWith(query)) {
                                wordSet.add(word);
                            }
                        });
                    }
                });
            });
    
            // Convert the Set to an array and limit the suggestions to 10 words
            setSuggestions(Array.from(wordSet).slice(0, 10));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && searchQuery.trim()) {
            navigate(`/Search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (username) => {
        setSearchQuery(username); // Set the clicked username as the search query
        setSuggestions([]); // Clear suggestions
        navigate(`/Search?query=${encodeURIComponent(username)}`);
    };
    

    // ------------------- End of Imported Function to handle search query ------------------- //




    //this function passes the reservation id to the ReservationDetails page
    const handleViewReservation = (id) => {
        navigate(`/ReservationDetails/${id}`);
    };


    // State to hold all reservations
    const [reservations, setReservations] = useState([]);


    // Fetching reservations from API
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getRentalList?userID=${userId}`);
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
            <div className="flex flex-col items-center justify-center gap-2 min-h-screen mx-2 pb-20 bg-main-background">
                <div className='p-2 fixed top-0  w-full bg-main-background'>
                    <InAppLogo />
                </div>
                {/* Search Bar Section */}
                <div className='fixed top-12 flex w-full justify-between bg-main-background'>
                    <SearchBar value={searchQuery} onChange={handleSearchQueryChange} onKeyDown={handleKeyDown}/>
                </div>
                {suggestions.length > 0 && (
                    <div className="fixed top-20 w-full z-50">
                        <div className="shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="w-full hover:bg-gray-100 cursor-pointer rounded-lg"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <p className="bg-white text-base border-b mx-2 px-2">{suggestion}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Updates the page title based on the number of reservations */}
                <div className="pb-2 mt-24">
                    {reservations.length === 0 ? (
                        <h2 className="text-xl">No upcoming reservations</h2>
                    ) : (
                        <h2 className="text-xl">Upcoming Reservations</h2>
                    )}

                </div>
                {/* Displays the reservations */}
                <div >
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